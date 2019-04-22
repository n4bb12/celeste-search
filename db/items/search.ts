import { Trait } from "celeste-api-types"

import { Item } from "../interfaces"
import { SearchBuilder } from "../shared/search-helpers"
import {
  searchByEffects,
  searchByLevels,
  searchByRecipe,
  searchByVendor,
} from "../shared/search-tags"

import {
  isClassicItem,
  isHalloweenReward,
  isQuestReward,
  isReforgeable,
  isSoldByCouncilOfImhotep,
  isSoldByCyprus,
  isSoldByDelianLeague,
  isSoldByLegionOfCarthage,
  isWinterReward,
} from "./source"

/**
 * Constructs a search string consisting of all keywords the
 * item can be found by.
 */
export async function buildSearchString(item: Item, trait: Trait): Promise<string> {
  const builder = new SearchBuilder()

  builder.add("gears")
  builder.add("items")

  builder.addStrict(trait.name)

  builder.add(item.name)
  builder.add(item.rarity)
  builder.add(item.type)

  await searchByLevels(builder, item.levels)
  await searchByEffects(builder, item.effects)
  await searchByRecipe(builder, item.recipe)
  await searchByVendor(builder, item.vendors)

  if (isSoldByCyprus(trait)) {
    builder.add("Cyprus")
  }
  if (isSoldByCouncilOfImhotep(trait)) {
    builder.add("Council of Imhotep")
  }
  if (isSoldByDelianLeague(trait)) {
    builder.add("Delian League")
  }
  if (isSoldByLegionOfCarthage(trait)) {
    builder.add("Legion of Carthage")
  }
  if (isHalloweenReward(trait)) {
    builder.add("Halloween Event 2018 Reward")
  }
  if (isWinterReward(trait)) {
    builder.add("Winter Event 2018 Reward")
  }
  if (isQuestReward(trait)) {
    builder.add("Quest Reward")
  }
  if (isReforgeable(trait)) {
    builder.add("Reforgeable")
  }
  if (item.vendors && item.vendors.some(vendor => vendor.currency === "empire")) {
    builder.add("Legendary Rotation")
  }
  if (isClassicItem(trait)) {
    builder.add("Classic")
  } else {
    builder.add("Celeste")
  }

  if ([
    "BallistaArms",
    "BellyBows",
    "Bows",
    "Clubs2H",
    "FireThrowers",
    "GreatAxe",
    "Javalins",
    "RamHeads",
    "Sling",
    "Spears1H",
    "Spears2H",
    "Swords1H",
  ].includes(trait.traittype)) {
    builder.add("weapon")
  }

  if ([
    "ArmorBuilding",
    "ArmorCloth",
    "ArmorLgt",
    "ArmorMed",
    "ArmorPlt",
    "Arrows",
    "FishingNet",
    "Gear",
    "GearBldg",
    "GearBoat",
    "GearPriest",
    "GearSiege",
    "GearVill",
    "Merchant",
    "Scepter",
    "ScoutSpecial1H",
    "Shields",
    "Staffs2H",
    "Tools",
    "Torc",
    "War Horn",
    "Warpaint",
  ].includes(trait.traittype)) {
    builder.add("armor")
  }

  if ([
    "VanityHelm",
    "VanityShield",
    "VanityWeapon",
  ].includes(trait.traittype)) {
    builder.add("vanity")
  }

  return builder.build()
}
