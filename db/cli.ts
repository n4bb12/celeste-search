import { copy, ensureDir, remove, writeFile } from "fs-extra"

import { buildAdvisors } from "./advisors/build"
import { buildBlueprints } from "./blueprints/build"
import { buildConsumables } from "./consumables/build"
import { buildDesigns } from "./designs/build"
import { buildItems } from "./items/build"
import { buildMaterials } from "./materials/build"

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

async function createDB() {
  console.log("Build database...")

  const items = await buildItems()
  const advisors = await buildAdvisors()
  const blueprints = await buildBlueprints()
  const designs = await buildDesigns()
  const consumables = await buildConsumables()
  const materials = await buildMaterials(items, blueprints, designs)

  const results = {
    items,
    advisors,
    blueprints,
    designs,
    consumables,
    shared: { materials },
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
  await createDB()
  await copyInterfaces()
}

buildAndSaveDB()
