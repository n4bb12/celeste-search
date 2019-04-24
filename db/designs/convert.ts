import { Design as ApiDesign } from "celeste-api-types"

import { downloadIcon } from "../download"
import { Design } from "../interfaces"
import { translateEn } from "../shared/convert-text"
import { findVendors } from "../vendors"

import { buildSearchString } from "./search"

export async function convertDesign(design: ApiDesign): Promise<Design> {
  const name = await translateEn(design.displaynameid, design.name)
  const description = await translateEn(design.rollovertextid, "")
  const iconId = await downloadIcon(`Art/${design.icon}`, "designs")
  const rarity = design.rarity.replace("cRarity", "").toLowerCase()

  const materials = design.input.material.map(mat => {
    return {
      id: mat.id,
      quantity: mat.quantity,
    }
  })

  const result: Design = {
    id: design.name,
    name,
    description,
    icon: iconId,
    rarity,
    materials,
    vendors: undefined,
    search: "",
  }

  result.vendors = await findVendors(result)
  result.search = await buildSearchString(result)

  return result
}
