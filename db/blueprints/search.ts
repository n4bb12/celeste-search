import { Materials } from "celeste-api-types"
import chalk from "chalk"

import { Blueprint } from "../interfaces"
import { formatSearchString, simplify } from "../shared/format-search-string"

const SINGLE_WORD_SEPARATOR = "_"

interface Replacements {
  [index: string]: string
}

/**
 * Constructs a search string consisting of all keywords the
 * item can be found by.
 */
export function buildSearchString(blueprint: Blueprint, materials: Materials): string {
  const words: string[] = []

  words.push(blueprint.name)
  words.push(simplify(blueprint.name))

  words.push(blueprint.description)
  words.push(simplify(blueprint.description))

  words.push(blueprint.rarity)

  blueprint.materials.forEach(ref => {
    words.push("" + ref.quantity)

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

  if (blueprint.vendors) {
    blueprint.vendors.forEach(vendor => {
      words.push(vendor.name)
      words.push(vendor.name.replace(/ /g, SINGLE_WORD_SEPARATOR))
      words.push(simplify(vendor.name))
      words.push(simplify(vendor.name).replace(/ /g, SINGLE_WORD_SEPARATOR))
    })
  }

  [...blueprint.vendors || []].forEach(vendor => {
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

export function buildSearchReplacementMap(blueprint: Blueprint[], materials: Materials): Replacements {
  const map = {}

  // TODO

  return map
}
