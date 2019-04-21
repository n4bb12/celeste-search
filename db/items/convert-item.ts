import { Trait } from "celeste-api-types"

import { downloadIcon } from "../download"
import { Item } from "../interfaces"
import { translateEn } from "../shared/convert-text"
import { findAndConvertVendors } from "../shared/convert-vendors"

import { convertEffects } from "./convert-effects"
import { findAndConvertRecipe } from "./convert-recipe"
import { addToLegendaryRotation } from "./legendary-rotation"
import { buildSearchString } from "./search"
import { isReforgeable } from "./source"

/**
 * Converts items from their API format to the format
 * used by the search app.
 */
export async function convertItem(trait: Trait): Promise<Item> {
  const name = await translateEn(trait.displaynameid, trait.name)
  const type = await translateEn(trait.rollovertextid)
  const iconId = await downloadIcon(trait.icon, "items")

  const item: Item = {
    name,
    type,
    levels: trait.itemlevels.map(l => l - 3).filter(l => l > 0),
    icon: iconId,
    rarity: trait.rarity,
    effects: convertEffects(trait),
    effectsRange: undefined,
    recipe: undefined,
    vendors: undefined,
    search: undefined,
  }

  if (item.levels.length === 0) {
    item.levels = [40]
  }

  item.recipe = await findAndConvertRecipe(trait)

  item.vendors = await findAndConvertVendors(item)
  addToLegendaryRotation(item, trait)

  if (trait.rarity === "legendary") {
    item.effectsRange = isReforgeable(trait)
  } else {
    item.effectsRange = !item.vendors.some(vendor => vendor.currency !== "empire")
  }

  item.search = await buildSearchString(item, trait)
  item.vendors = item.vendors.length ? item.vendors : undefined

  return item
}
