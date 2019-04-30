import { Design as ApiDesign } from "celeste-api-types"

import { API, downloadIcon } from "../download"
import { Design } from "../interfaces"
import { translateEn } from "../shared/convert-text"
import { findVendors } from "../vendors"

import { convertMaterials } from "./convert-materials"
import { buildSearchString } from "./search"

export async function convertDesign(design: ApiDesign): Promise<Design> {
  const allTraits = await API.getTraits()
  const allMats = await API.getMaterials()

  // unfortunately, casing is not always consistent
  Object.keys(allTraits).forEach(id => {
    allTraits[id.toLowerCase()] = allTraits[id]
  })
  Object.keys(allMats).forEach(id => {
    allMats[id.toLowerCase()] = allMats[id]
  })

  const description = await translateEn(design.rollovertextid, "")
  const icon = await downloadIcon(`Art/${design.icon}`, "designs")
  const rarity = design.rarity.replace("cRarity", "").toLowerCase()
  const materials = convertMaterials(design)
  const type = Object.keys(design.output)[0]
  const school = type === "material" ? "Material" : design.tag

  const output = design.output[type]
  const outputId = output.id.toLowerCase()
  const outputLevel = output.level ? output.level - 3 : undefined
  const outputDetails: any = allTraits[outputId] || allMats[outputId]
  const outputName = await translateEn(outputDetails.displaynameid, outputDetails.name)
  const outputIcon = await downloadIcon(`Art/${outputDetails.icon}`, "designs")

  const result: Design = {
    id: design.name,
    description,
    icon,
    rarity,
    type,
    school,
    materials,
    vendors: undefined,
    marketplace: undefined,
    outputId,
    outputName,
    outputIcon,
    outputLevel,
    search: "",
  }

  result.vendors = await findVendors(result.id)
  result.search = await buildSearchString(result, design)

  return result
}
