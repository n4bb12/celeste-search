import { copy, ensureDir, remove, writeFile } from "fs-extra"

import { buildAdvisors } from "./advisors/build"
import { buildBlueprints } from "./blueprints/build"
import { buildDesigns } from "./designs/build"
import { DB } from "./interfaces"
import { buildItems } from "./items/build"
import { buildMaterials } from "./materials/build"
import { buildSearchReplacementMap } from "./materials/search"

async function buildDB() {
  console.log("Build database...")

  const materials = await buildMaterials()
  const items = await buildItems(materials)
  const advisors = await buildAdvisors()
  const blueprints = await buildBlueprints()
  const designs = await buildDesigns()
  const replace = buildSearchReplacementMap(items, materials)

  const db: DB = {
    materials,
    items,
    advisors,
    blueprints,
    designs,
    consumables: [],
    replace,
  }

  return db
}

async function saveDB(db: DB) {
  await ensureDir("generated")
  await remove("generated/db.json")
  await writeFile("generated/db.json", JSON.stringify(db, null, 2), "utf8")

  await ensureDir("src/assets")
  await remove("src/assets/db.json")
  await writeFile("src/assets/db.json", JSON.stringify(db), "utf8")
}

async function copyInterfaces() {
  await ensureDir("src/app/interfaces")
  await remove("src/app/interfaces/*")
  await copy("db/interfaces", "src/app/interfaces")
}

async function buildAndSaveDB() {
  await remove("generated/sprites")
  await saveDB(await buildDB())
}

buildAndSaveDB()
copyInterfaces()
