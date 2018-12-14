import { copy, writeFile } from "fs-extra"

import { buildDb } from "./build/build-db"

async function createAndSaveDb() {
  const db = await buildDb()

  await writeFile("generated/db.json", JSON.stringify(db, null, 2), "utf8")
  await writeFile("src/assets/generated/db.min.json", JSON.stringify(db), "utf8")

  await copy("db/interfaces/app", "src/app/interfaces")
}

createAndSaveDb()
