import Bottleneck from "bottleneck"
import { Trait } from "celeste-api-types"
import chalk from "chalk"

import { convertItem } from "../convert/convert-item"
import { convertMaterials } from "../convert/convert-materials"
import { API } from "../download"
import { DB } from "../interfaces/app"

import {
  buildSearchReplacementMap,
  buildSearchString,
} from "./build-search-string"
import { compareItems } from "./compare-items"

const limiter = new Bottleneck({
  maxConcurrent: 5,
  reservoir: 10,
  reservoirRefreshAmount: 10,
  reservoirRefreshInterval: 100,
})

/**
 * Creates the data (db.json) behind the item search app.
 */
export async function buildDb(): Promise<DB> {
  console.log("Build item database...")

  const traits = await API.getTraits()

  const traitToItemConversions = Object.values(traits.data)
    .filter(traitHasLevels)
    .map(trait => limiter.schedule(() => convertItem(trait)))

  let items = await Promise.all(traitToItemConversions)
  const materials = await convertMaterials(items)
  const replace = buildSearchReplacementMap(items, materials)

  items = items.sort(compareItems)
  items.forEach(item => item.search = buildSearchString(item, materials))

  const db: DB = {
    items,
    advisors: [],
    blueprints: [],
    designs: [],
    consumables: [],
    materials,
    replace,
  }
  return db
}

function traitHasLevels(trait: Trait) {
  if (trait.itemlevels.length > 0) {
    return true
  }
  console.log(chalk.yellow(`SKIPPED - Item has no levels: ${trait.name} (${trait.dbid})`))
}
