import { downloadIcon } from "../download"
import { Trait } from "../interfaces/api"
import { Item } from "../interfaces/app"

import { convertEffects } from "./convert-effects"
import { findAndConvertRecipe } from "./convert-recipe"
import { translateEn } from "./convert-text"
import { findAndConvertVendors } from "./convert-vendors"

/**
 * Converts items from their API format to the format
 * used by the item search app.
 */
export async function convertItem(trait: Trait): Promise<Item> {
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

  item.vendors = await findAndConvertVendors(item)
  item.recipe = await findAndConvertRecipe(item)

  return item
}
