import chalk from "chalk"
import * as Throttle from "promise-parallel-throttle"

import { convertItem } from "../convert/convert-item"
import { convertMaterials } from "../convert/convert-materials"
import { downloadApiResource } from "../download/download-api-resource"
import { Trait, Traits } from "../interfaces/api"
import { DB } from "../interfaces/app"

import {
  buildClientSideSearchReplacements,
  buildSearchString,
} from "./build-search-string"
import { compareItems } from "./compare-items"

const throttleOptions: Throttle.Options = {
  maxInProgress: 5,
  failFast: false,
}

/**
 * Creates the data (db.json) behind the item search app.
 */
export async function buildDb(): Promise<DB> {
  console.log("Build item database...")

  const traits = await downloadApiResource<Traits>("/game/traits")

  const asyncConvertToItemTasks = Object.values(traits.data)
    .filter(shouldIncludeTrait)
    .map(trait => () => convertItem(trait))

  let items = await Throttle.all(asyncConvertToItemTasks, throttleOptions)
  const materials = await convertMaterials(items)
  const replace = buildClientSideSearchReplacements(items, materials)

  items = items.sort(compareItems)
  items.forEach(item => item.search = buildSearchString(item, materials))

  const db: DB = {
    items,
    materials,
    replace,
  }
  return db
}

function shouldIncludeTrait(trait: Trait) {
  if (trait.itemlevels.length === 0) {
    console.log(chalk.yellow(`SKIPPED - Item has no levels: ${trait.name} (${trait.dbid})`))
    return false
  }
  return true
}