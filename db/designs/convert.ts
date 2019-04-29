import { Design as ApiDesign } from "celeste-api-types"

import { downloadIcon } from "../download"
import { Design } from "../interfaces"
import { translateEn } from "../shared/convert-text"
import { findVendors } from "../vendors"

import { convertMaterials } from "./convert-materials"
import { buildSearchString } from "./search"

export async function convertDesign(design: ApiDesign): Promise<Design> {
  const name = await translateEn(design.displaynameid, design.name)
  const description = await translateEn(design.rollovertextid, "")
  const icon = await downloadIcon(`Art/${design.icon}`, "designs")
  const rarity = design.rarity.replace("cRarity", "").toLowerCase()
  const materials = convertMaterials(design)

  const result: Design = {
    id: design.name,
    name,
    description,
    icon,
    rarity,
    materials,
    vendors: undefined,
    marketplace: undefined,
    search: "",
  }

  result.vendors = await findVendors(result.id)
  result.search = await buildSearchString(result)

  return result
}
