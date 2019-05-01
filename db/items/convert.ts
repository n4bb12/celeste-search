import { Trait } from "celeste-api-types"

import { downloadIcon } from "../download"
import { Item } from "../interfaces"
import { translateEn } from "../shared/convert-text"
import { findVendors } from "../vendors"

import { convertEffects } from "./convert-effects"
import { convertEvent } from "./convert-event"
import { findAndConvertRecipe } from "./convert-recipe"
import { addToLegendaryRotation } from "./legendary-rotation"
import { buildSearchString } from "./search"
import {
  getQuestName,
  isBabylonianStartingGear,
  isNorseStartingGear,
  isPersianStartingGear,
  isReforgeable,
  isStartingGear,
} from "./source"

/**
 * Converts items from their API format to the format
 * used by the search app.
 */
export async function convertItem(trait: Trait): Promise<Item> {
  const name = await translateEn(trait.displaynameid, trait.name)
  const type = await translateEn(trait.rollovertextid, "")
  const icon = await downloadIcon(`Art/${trait.icon}`, "items")

  const item: Item = {
    id: trait.name,
    name,
    type,
    levels: trait.itemlevels.map(l => l - 3).filter(l => l > 0),
    icon,
    rarity: trait.rarity,
    effects: convertEffects(trait),
    effectsRange: undefined,
    recipe: undefined,
    vendors: undefined,
    marketplace: undefined,
    quest: getQuestName(trait),
    event: convertEvent(trait),
    starting: [
      isPersianStartingGear(trait) && "persian",
      isBabylonianStartingGear(trait) && "babylonian",
      isNorseStartingGear(trait) && "norse",
    ].filter(Boolean) as string[],
    search: "",
    searchDynamic: undefined,
  }

  if (!item.levels.length) {
    if (trait.traittype.toLowerCase().startsWith("vanity")) {
      item.levels = [1]
    }
    if (isStartingGear(trait)) {
      item.levels = [20]
    }
  }

  if (!item.starting!.length) {
    delete item.starting
  }

  item.recipe = await findAndConvertRecipe(trait)
  item.vendors = await findVendors(item.id)

  if (trait.rarity === "legendary") {
    addToLegendaryRotation(item, trait)
    if (item.effects) {
      item.effectsRange = isReforgeable(trait) || undefined
    }
  } else {
    if (item.effects) {
      item.effectsRange = !item.vendors || !item.vendors.length
    }
  }

  item.search = await buildSearchString(item, trait)

  return item
}
