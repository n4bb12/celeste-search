import { Trait } from "celeste-api-types"
import chalk from "chalk"

import { convertAdvisor } from "../convert/convert-advisor"
import { convertItem } from "../convert/convert-item"
import { convertMaterials } from "../convert/convert-materials"
import { API } from "../download"
import { Advisor, DB } from "../interfaces/app"

import {
  buildSearchReplacementMap,
  buildSearchString,
} from "./build-search-string"
import { compareAdvisors } from "./compare-advisors"
import { compareItems } from "./compare-items"

/**
 * Creates the data (db.json) behind the item search app.
 */
export async function buildDb(): Promise<DB> {
  console.log("Build database...")

  const items = await Promise.all(
    Object.values(await API.getTraits())
      .filter(traitHasLevels)
      .map(convertItem))
  items.sort(compareItems)

  const singleAdvisors = await Promise.all(
    Object.values(await API.getAdvisors())
      .map(convertAdvisor))
  const advisorMap: { [name: string]: Advisor } = {}
  singleAdvisors.forEach(advisor => {
    const parent = advisorMap[advisor.name]
    const rarity = Object.keys(advisor.rarities)[0]
    if (parent) {
      parent.rarities[rarity] = advisor.rarities[rarity]
    } else {
      advisorMap[advisor.name] = advisor
    }
  })
  const advisors = Object.values(advisorMap)
  advisors.sort(compareAdvisors)

  const materials = await convertMaterials(items)
  items.forEach(item => item.search = buildSearchString(item, materials))
  advisors.forEach(advisor => advisor.search = "TODO")

  const replace = buildSearchReplacementMap(items, materials)

  const db: DB = {
    items,
    advisors,
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
