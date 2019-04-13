import { Advisor } from "../interfaces"
import { formatSearchString, simplify } from "../shared/format-search-string"

const SINGLE_WORD_SEPARATOR = "_"

interface Replacements {
  [index: string]: string
}

/**
 * Constructs a search string consisting of all keywords the
 * item can be found by.
 */
export async function buildSearchString(advisor: Advisor): Promise<string> {
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

export function buildSearchReplacementMap(advisors: Advisor[]): Replacements {
  const map = {}

  // TODO

  return map
}
