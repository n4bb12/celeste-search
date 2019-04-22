import { copy, ensureDir, remove, writeFile } from "fs-extra"

import { buildAdvisors } from "./advisors/build"
import { buildBlueprints } from "./blueprints/build"
import { buildDesigns } from "./designs/build"
import { DB } from "./interfaces"
import { buildItems } from "./items/build"
import { buildMaterials } from "./materials/build"

async function buildDB() {
  console.log("Build database...")

  const materials = await buildMaterials()
  const items = await buildItems(materials)
  const advisors = await buildAdvisors()
  const blueprints = await buildBlueprints()
  const designs = await buildDesigns()

  const db: DB = {
    materials,
    items,
    advisors,
    blueprints,
    designs,
    consumables: [],
  }

  return db
}

async function cleanup() {
  const dirs = [
    "generated/db",
    "generated/sprites",
    "src/app/interfaces",
    "src/assets/db",
  ]

  for (const dir of dirs) {
    await ensureDir(dir)
    await remove(`${dir}/*`)
  }
}

async function saveDB(db: DB) {
  const {
    materials,
    items,
    advisors,
    blueprints,
    designs,
    consumables,
  } = db

  const results = {
    shared: { materials },
    items: { items },
    advisors: { advisors },
    blueprints: { blueprints },
    designs: { designs },
    consumables: { consumables },
  }

  for (const key of Object.keys(results)) {
    await writeFile(`generated/db/${key}.json`, JSON.stringify(results[key], null, 2), "utf8")
    await writeFile(`src/assets/db/${key}.json`, JSON.stringify(results[key]), "utf8")
  }
}

async function copyInterfaces() {
  await copy("db/interfaces", "src/app/interfaces")
}

async function buildAndSaveDB() {
  await cleanup()
  await saveDB(await buildDB())
  await copyInterfaces()
}

buildAndSaveDB()
