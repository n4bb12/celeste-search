import { Advisor } from "../interfaces"
import {
  SearchBuilder,
  simplify,
  WORD_SEPARATOR,
} from "../shared/search"

/**
 * Constructs a search string consisting of all keywords the
 * item can be found by.
 */
export async function buildSearchString(advisor: Advisor): Promise<string> {
  const builder = new SearchBuilder()

  builder.add(advisor.name)
  builder.add(advisor.age)
  builder.add(advisor.level)
  builder.add("level " + advisor.level)
  builder.add(advisor.civilization || "")

  if (advisor.vendors) {
    advisor.vendors.forEach(vendor => {
      builder.add(vendor.name)
    })
  }

  if (advisor.rarities) {
    Object.values(advisor.rarities).forEach(rarity => {
      builder.add(rarity.description)
    })
  }

  [...advisor.vendors || []].forEach(vendor => {
    builder.add("buyable")
    builder.add("purchaseable")
    builder.add("shops")
    builder.add("stores")
    builder.add("vendors")

    builder.add(vendor.name)
    if (vendor.currency === "coin") {
      builder.add("coins")
      builder.add("money")
    } else {
      builder.add("points")
      builder.add("tokens")
      builder.add(vendor.currency)
      builder.add(vendor.currency + " points")
      builder.add(vendor.currency + " tokens")
    }
  })

  return builder.build()
}
