import chalk from "chalk"

import { Advisor, Item, Materials } from "../interfaces"
import { formatSearchString } from "../shared/format-search-string"
import { preprocessSearch } from "../shared/preprocess-search"

const SINGLE_WORD_SEPARATOR = "_"

interface Replacements {
  [index: string]: string
}

/**
 * Constructs a search string consisting of all keywords the
 * item can be found by.
 */
export function buildSearchString(advisor: Advisor): string {
  const words: string[] = []

  words.push(advisor.name)
  words.push(simplify(advisor.name))

  words.push("" + advisor.age)

  words.push("" + advisor.level)
  words.push("level_" + advisor.level)

  words.push(advisor.civilization)

  if (advisor.vendors) {
    advisor.vendors.forEach(vendor => {
      words.push(vendor.name)
      words.push(vendor.name.replace(/ /g, SINGLE_WORD_SEPARATOR))
      words.push(simplify(vendor.name))
      words.push(simplify(vendor.name).replace(/ /g, SINGLE_WORD_SEPARATOR))
    })
  }

  if (advisor.rarities) {
    Object.values(advisor.rarities).forEach(rarity => {
      words.push(rarity.id)
      words.push(simplify(rarity.description))
    })
  }

  [...advisor.vendors || []].forEach(vendor => {
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

  return formatSearchString(words)
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
