import chalk from "chalk"

import { API } from "../download"
import { ItemEffect, Recipe, Vendor } from "../interfaces"

import { translateEn } from "./convert-text"
import { SearchBuilder } from "./search-helpers"

export async function searchByLevels(builder: SearchBuilder, levels?: number[]) {
  if (!levels || !levels.length) {
    return
  }

  levels.forEach(level => {
    builder.add("level" + level)
  })
}

export async function searchByEffects(builder: SearchBuilder, effects?: ItemEffect[]) {
  if (!effects || !effects.length) {
    return
  }

  effects.forEach(effect => {
    builder.add(effect.name)
  })
}

export async function searchByMaterial(
  builder: SearchBuilder, refs?: Array<{ id: string, quantity: number }>,
) {
  if (!refs || !refs.length) {
    return
  }

  const materials = await API.getMaterials()

  for (const ref of refs) {
    const material = materials[ref.id]

    if (material) {
      builder.add(await translateEn(material.displaynameid, material.name))
    } else {
      console.log(chalk.yellow("Material not found: " + ref.id))
    }
  }
}

export async function searchByRecipe(builder: SearchBuilder, recipe?: Recipe) {
  if (!recipe) {
    return
  }

  builder.add("recipes")
  builder.add("craftables")
  builder.add(recipe.school)

  await searchByMaterial(builder, recipe.materials)
}

export async function searchByVendor(builder: SearchBuilder, vendors?: Vendor[]) {
  if (!vendors || !vendors.length) {
    return
  }

  vendors.forEach(vendor => {
    builder.add("buyable")
    builder.add("purchaseable")
    builder.add("shops")
    builder.add("stores")
    builder.add("vendors")
    builder.add("sold")

    builder.addStrict(vendor.id)
    builder.add(vendor.name)

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
  })
}
