import { downloadApiResource, downloadIcon } from "../download"
import { Item, Materials } from "../interfaces/app"

import { translateEn } from "./convert-text"

/**
 * Collects all materials that can be used to craft the
 * items passed.
 */
export async function convertMaterials(items: Item[]): Promise<Materials> {
  const materials = await downloadApiResource<Materials>("/game/materials")
  const result: Materials = {}

  for (const item of items) {
    if (item.recipe) {
      for (const mat of item.recipe.materials) {
        const apiId = Object.keys(materials.data).find(key => {
          return key.toLowerCase() === mat.id.toLowerCase()
        })
        const apiMat = materials.data[apiId]
        const name = await translateEn(apiMat.displaynameid)
        const icon = await downloadIcon(apiMat.icon, "materials")
        const rarity = apiMat.rarity.substr("cRarity".length).toLowerCase()

        result[mat.id] = { name, icon, rarity }
      }
    }
  }

  return result
}