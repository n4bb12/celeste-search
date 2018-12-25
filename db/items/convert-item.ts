import { Trait } from "celeste-api-types"

import { downloadIcon } from "../download"
import { Item, Materials } from "../interfaces"
import { translateEn } from "../shared/convert-text"

import { convertEffects } from "./convert-effects"
import { findAndConvertRecipe } from "./convert-recipe"
import { findAndConvertItemVendors } from "./convert-vendors"
import { buildItemSearchString } from "./search"

/**
 * Converts items from their API format to the format
 * used by the search app.
 */
export async function convertItem(trait: Trait, materials: Materials): Promise<Item> {
  const name = await translateEn(trait.displaynameid)
  const type = await translateEn(trait.rollovertextid)
  const iconId = await downloadIcon(trait.icon, "items")

  const item: Item = {
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

  if (item.levels.length === 0) {
    item.levels = [40]
  }

  if ([
    "Athena´s Long Spear",
  ].indexOf(item.name) >= 0) {
    item.noEffectRange = true
  }

  item.vendors = await findAndConvertItemVendors(item)
  item.recipe = await findAndConvertRecipe(item)
  item.search = buildItemSearchString(item, materials)

  return item
}
