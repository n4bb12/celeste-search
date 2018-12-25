import { Material as ApiMaterial } from "celeste-api-types"

import { downloadIcon } from "../download"
import { Material } from "../interfaces"
import { translateEn } from "../shared/convert-text"

export async function convertMaterial(apiMaterial: ApiMaterial): Promise<Material> {
  const name = await translateEn(apiMaterial.displaynameid)
  const icon = await downloadIcon(apiMaterial.icon, "materials")
  const rarity = apiMaterial.rarity.substr("cRarity".length).toLowerCase()

  const material: Material = {
    name,
    icon,
    rarity,
  }

  return material
}
