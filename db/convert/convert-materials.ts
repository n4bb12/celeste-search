import { downloadIcon } from "../download"
import { Item, Materials } from "../interfaces/app"
import { API } from "./../download/download-api-resource"

import { translateEn } from "./convert-text"

/**
 * Collects all materials that can be used to craft the
 * items passed.
 */
export async function convertMaterials(items: Item[]): Promise<Materials> {
  const materials = await API.getMaterials()
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

  await downloadIcon("UserInterface/CapCity/Coin_ua", "materials", "coin")
  await downloadIcon("UserInterface/CapCity/Button_EmpireStore", "materials", "empire")
  await downloadIcon("UserInterface/Map/UI_Region_Shortcuts/RegionShieldCrete_Normal_ua", "materials", "crete")
  await downloadIcon("UserInterface/Map/UI_Region_Shortcuts/RegionShieldSparta_Normal_ua", "materials", "sparta")

  return result
}
