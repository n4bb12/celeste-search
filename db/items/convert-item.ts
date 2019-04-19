import { Trait } from "celeste-api-types"

import { downloadIcon } from "../download"
import { Item, Materials } from "../interfaces"
import { translateEn } from "../shared/convert-text"

import { convertEffects } from "./convert-effects"
import { findAndConvertRecipe } from "./convert-recipe"
import { findAndConvertItemVendors } from "./convert-vendors"
import { buildSearchString } from "./search"

/**
 * Converts items from their API format to the format
 * used by the search app.
 */
export async function convertItem(trait: Trait): Promise<Item> {
  const name = await translateEn(trait.displaynameid, trait.name)
  const type = await translateEn(trait.rollovertextid)
  const iconId = await downloadIcon(trait.icon, "items")

  const result: Item = {
    id: trait.dbid,
    trait: trait.name,
    name,
    type,
    levels: trait.itemlevels.map(l => l - 3).filter(l => l > 0),
    icon: iconId,
    rarity: trait.rarity,
    effects: convertEffects(trait),
    noEffectRange: undefined,
    recipe: undefined,
    vendors: undefined,
    search: undefined,
  }

  if (result.levels.length === 0) {
    result.levels = [40]
  }

  if ([
    "Athena´s Long Spear",
  ].includes(result.name)) {
    result.noEffectRange = true
  }

  result.recipe = await findAndConvertRecipe(result)
  result.vendors = await findAndConvertItemVendors(result)
  result.search = await buildSearchString(result)

  return result
}
