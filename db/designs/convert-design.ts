import { Design as ApiDesign } from "celeste-api-types"

import { downloadIcon } from "../download"
import { Design } from "../interfaces"
import { translateEn } from "../shared/convert-text"
import { findAndConvertVendors } from "../shared/convert-vendors"

/**
 * Converts designs from their API format to the format
 * used by the search app.
 */
export async function convertDesign(design: ApiDesign): Promise<Design> {
  const name = await translateEn(design.displaynameid, design.name)
  const description = await translateEn(design.rollovertextid)
  const iconId = await downloadIcon(`Art/${design.icon}`, "designs")
  const rarity = design.rarity.replace("cRarity", "").toLowerCase()
  const materials = design.input.material.map(mat => {
    return {
      id: mat.id,
      quantity: mat.quantity,
    }
  })

  if (!name) {
    console.log(design)
  }

  const result: Design = {
    name,
    description,
    icon: iconId,
    rarity,
    materials,
    vendors: undefined,
    search: undefined,
  }

  result.vendors = await findAndConvertVendors(result)
  result.search = "TODO"

  return result
}
