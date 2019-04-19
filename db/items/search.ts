import { Trait } from "celeste-api-types"
import chalk from "chalk"

import { API } from "../download"
import { Item, Materials, Replacements } from "../interfaces"
import { SearchBuilder, simplify, WORD_SEPARATOR } from "../shared/search"

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
  const materials = await API.getMaterials()
  const builder = new SearchBuilder()

  builder.add("gears")
  builder.add("items")
  builder.add(trait.name)
  builder.add(item.name)
  builder.add(item.rarity)
  builder.add(item.type)

  const levels: any[] = (item.levels.length > 0) ? item.levels : []
  levels.forEach(level => {
    builder.add(level)
    builder.add("level " + level)
  })

  if (item.effects) {
    item.effects.forEach(effect => {
      builder.add(effect.name)
    })
  }

  if (item.recipe) {
    builder.add("recipes")
    builder.add("craftables")
    builder.add(item.recipe.school)

    item.recipe.materials.forEach(ref => {
      builder.add(ref.quantity)

      const material = materials[ref.id]

      if (material) {
        builder.add(material.name)
      } else {
        console.log(chalk.yellow("Material not found: " + ref.id))
      }
    })
  }

  [...item.vendors || []].forEach(vendor => {
    builder.add("buyable")
    builder.add("purchaseable")
    builder.add("shops")
    builder.add("stores")
    builder.add("vendors")
    builder.add("sold")

    if (vendor.currency === "coin") {
      builder.add("coins")
      builder.add("money")
      builder.add("gold")
    } else {
      builder.add("points")
      builder.add("tokens")
      builder.add(vendor.currency)
      builder.add(vendor.currency + " points")
      builder.add(vendor.currency + " tokens")
    }
    builder.add(vendor.name)
  })

  if (isSoldByCyprus(trait)) {
    builder.add("Sold by Cyprus")
  }
  if (isSoldByCouncilOfImhotep(trait)) {
    builder.add("Sold by Council of Imhotep")
  }
  if (isSoldByDelianLeague(trait)) {
    builder.add("Sold by Delian League")
  }
  if (isSoldByLegionOfCarthage(trait)) {
    builder.add("Sold by Legion of Carthage")
  }
  if (isHalloweenReward(trait)) {
    builder.add("Halloween Event 2018")
  }
  if (isWinterReward(trait)) {
    builder.add("Winter Event 2018")
  }
  if (isQuestReward(trait)) {
    builder.add("Quest")
  }
  if (isReforgeable(trait)) {
    builder.add("Reforgeable")
  }
  if (item.vendors.some(vendor => vendor.currency === "empire")) {
    builder.add("Legendary Rotation")
  }
  if (isClassicItem(trait)) {
    builder.add("Classic")
  } else {
    builder.add("Celeste")
  }

  return builder.build()
}

export function buildSearchReplacementMap(items: Item[], materials: Materials): Replacements {
  const map = {}

  function searchAsSingleWord(str: string): void {
    str = simplify(str)
    if (str.includes(" ")) {
      map[str] = str.replace(/\s+/g, WORD_SEPARATOR)
    }
  }

  searchAsSingleWord("level ")
  searchAsSingleWord("bonus damage")

  items.map(item => item.type)
    .forEach(searchAsSingleWord)

  items.forEach(item => {
    (item.effects || [])
      .map(effect => effect.name)
      .forEach(searchAsSingleWord);
    (item.vendors || [])
      .map(vendor => vendor.name)
      .forEach(searchAsSingleWord)
  })

  Object.values(materials).forEach(material => {
    searchAsSingleWord(material.name)
    searchAsSingleWord(material.name.replace(/'/, ""))
    searchAsSingleWord(simplify(material.name))
    searchAsSingleWord(simplify(material.name).replace(/'/, ""))
  })

  return map
}
