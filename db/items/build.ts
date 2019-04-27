import { API } from "../download"
import { Item, Materials } from "../interfaces"

import { convertItem } from "./convert"
import { includeItem } from "./filter"
import { compareItems } from "./sort"

export async function buildItems(materials: Materials): Promise<Item[]> {
  console.log("Build items...")

  const traits = await API.getTraits()
  const conversions = Object.values(traits).map(convertItem)
  const results = await Promise.all(conversions)

  return results
    // remove items that were changed and only exists for backwards compatibility
    .filter(item => item.levels.length
      || results.filter(other => other.name === item.name).length === 1)
    .filter(includeItem)
    .sort(compareItems)
}
