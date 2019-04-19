import chalk from "chalk"

import { API } from "../download"
import { Blueprint } from "../interfaces"
import {
  SearchBuilder,
  simplify,
  WORD_SEPARATOR,
} from "../shared/search"

/**
 * Constructs a search string consisting of all keywords the
 * item can be found by.
 */
export async function buildSearchString(blueprint: Blueprint): Promise<string> {
  const materials = await API.getMaterials()
  const builder = new SearchBuilder()

  builder.add(blueprint.name)
  builder.add(blueprint.description || "")
  builder.add(blueprint.rarity)

  blueprint.materials.forEach(ref => {
    builder.add(ref.quantity)

    const material = materials[ref.id]

    if (material) {
      builder.add(material.name)
    } else {
      console.log(chalk.yellow("Material not found: " + ref.id))
    }
  })

  if (blueprint.vendors) {
    blueprint.vendors.forEach(vendor => {
      builder.add(vendor.name)
    })
  }

  [...blueprint.vendors || []].forEach(vendor => {
    builder.add("buyable")
    builder.add("purchaseable")
    builder.add("shops")
    builder.add("stores")
    builder.add("vendors")

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
    builder.add(vendor.name)
  })

  return builder.build()
}
