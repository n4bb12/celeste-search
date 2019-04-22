import chalk from "chalk"

import { Item, Materials } from "../interfaces"
import { SearchBuilder } from "../shared/search-helpers"

export function buildItemSearchString(item: Item, materials: Materials): string {
  const builder = new SearchBuilder()

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
