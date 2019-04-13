import { API } from "../download"
import { Design } from "../interfaces"

import { convertDesign } from "./convert-design"
import { compareDesigns } from "./sort"

export async function buildDesigns(): Promise<Design[]> {
  console.log("Build designs...")

  const designs = await API.getDesigns()
  const conversions = Object.values(designs).map(convertDesign)
  const singleDesigns = await Promise.all(conversions)
  const mergedByName: { [name: string]: Design } = {}

  singleDesigns.forEach(design => {
    const merged = mergedByName[design.name]
    const rarity = Object.keys(design.rarities)[0]

    if (merged) {
      merged.rarities[rarity] = design.rarities[rarity]
    } else {
      mergedByName[design.name] = design
    }
  })

  const result = Object.values(mergedByName).sort(compareDesigns)

  return result
}
