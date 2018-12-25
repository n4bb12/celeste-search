import { Trait } from "celeste-api-types"
import chalk from "chalk"

import { API } from "../download"
import { Item, Materials } from "../interfaces"

import { convertItem } from "./convert-item"
import { compareItems } from "./sort"

export async function buildItems(materials: Materials): Promise<Item[]> {
  console.log("Build items...")

  const traits = await API.getTraits()
  const conversions = Object.values(traits)
    .filter(hasLevels)
    .map(trait => convertItem(trait, materials))
  const result = await Promise.all(conversions)

  return result.sort(compareItems)
}

function hasLevels(trait: Trait) {
  if (trait.itemlevels.length > 0) {
    return true
  }
  console.log(chalk.yellow(`SKIPPED - Item has no levels: ${trait.name} (${trait.dbid})`))
}
