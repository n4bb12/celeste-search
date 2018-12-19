import chalk from "chalk"
import { uniq } from "lodash"

import { Item, Materials } from "../interfaces/app"

import { preprocessSearch } from "./preprocess-search"

const SINGLE_WORD_SEPARATOR = "_"

interface Replacements {
  [index: string]: string
}

/**
 * Constructs a search string consisting of all keywords the
 * item can be found by.
 */
export function buildSearchString(item: Item, materials: Materials): string {
  const words = []

  words.push(item.name)
  words.push(simplify(item.name))

  words.push(item.rarity)

  words.push(item.type)
  words.push(item.type.replace(/ /g, SINGLE_WORD_SEPARATOR))

  const levels: any[] = (item.levels.length > 0) ? item.levels : []
  levels.forEach(level => {
    words.push("" + level)
    words.push("level_" + level)
  })

  if (item.effects) {
    item.effects.forEach(effect => {
      words.push(effect.name)
      words.push(effect.name.replace(/ /g, SINGLE_WORD_SEPARATOR))
      words.push(simplify(effect.name))
      words.push(simplify(effect.name).replace(/ /g, SINGLE_WORD_SEPARATOR))
    })
  }

  if (item.recipe) {
    words.push("recipes")
    words.push("craftables")
    words.push(item.recipe.school)
    words.push(item.recipe.school.replace(/ /g, SINGLE_WORD_SEPARATOR))

    item.recipe.materials.forEach(ref => {
      words.push(ref.quantity)

      const material = materials[ref.id]

      if (material) {
        words.push(material.name)
        words.push(material.name.replace(/ /g, SINGLE_WORD_SEPARATOR))
        words.push(simplify(material.name))
        words.push(simplify(material.name).replace(/ /g, SINGLE_WORD_SEPARATOR))
      } else {
        console.log(chalk.yellow("Material not found: " + ref.id))
      }
    })
  }

  [...item.vendors || []].forEach(vendor => {
    words.push("buyable")
    words.push("purchaseable")
    words.push("shops")
    words.push("stores")
    words.push("vendors")

    if (vendor.currency === "coin") {
      words.push("coins")
      words.push("money")
    } else {
      words.push("points")
      words.push("tokens")
      words.push(vendor.currency)
      words.push(vendor.currency + SINGLE_WORD_SEPARATOR + "points")
      words.push(vendor.currency + SINGLE_WORD_SEPARATOR + "tokens")
    }
    words.push(vendor.name)
    words.push(vendor.name)
    words.push(vendor.name.replace(/ /g, SINGLE_WORD_SEPARATOR))
    words.push(simplify(vendor.name))
    words.push(simplify(vendor.name).replace(/ /g, SINGLE_WORD_SEPARATOR))
  })

  const search = uniq(
    words.join(" ")
      .trim()
      .toLowerCase()
      .split(/\s+/))
    .sort()
    .join(" ")

  if (search.indexOf("undefined") >= 0) {
    throw new Error(search.replace(/undefined/g, chalk.red("undefined")))
  }

  return search
}

export function buildSearchReplacementMap(items: Item[], materials: Materials): Replacements {
  const map = {}

  function searchAsSingleWord(str: string): void {
    str = preprocessSearch(str)
    if (str.includes(" ")) {
      map[str] = str.replace(/ /g, SINGLE_WORD_SEPARATOR)
      map[str] = str.replace(/ /g, SINGLE_WORD_SEPARATOR)
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

function simplify(text: string, characters: string = "a-zA-Z0-9") {
  return text
    .replace(/'/, "")
    .replace(new RegExp(`[^${characters} ]`, "gi"), " ")
    .replace(/\s\s+/, " ")
    .trim()
}

function effectName(effect: string): string {
  return effect.substr(0, effect.indexOf(":"))
}
