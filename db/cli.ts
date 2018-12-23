import { copy, ensureDir, remove, writeFile } from "fs-extra"

import { buildDb } from "./build/build-db"

async function createAndSaveDb() {
  await remove("generated/sprites")
  const db = await buildDb()

  await ensureDir("generated")
  await remove("generated/db.json")
  await writeFile("generated/db.json", JSON.stringify(db, null, 2), "utf8")

  await ensureDir("src/assets")
  await remove("src/assets/db.json")
  await writeFile("src/assets/db.json", JSON.stringify(db), "utf8")

  await ensureDir("src/app/interfaces")
  await remove("src/app/interfaces/*")
  await copy("db/interfaces/app", "src/app/interfaces")
}

createAndSaveDb()
