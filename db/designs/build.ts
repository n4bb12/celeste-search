import { API } from "../download"
import { Design } from "../interfaces"

import { convertDesign } from "./convert"
import { includeApiDesign, includeDesign } from "./filter"
import { compareDesigns } from "./sort"

export async function buildDesigns(): Promise<Design[]> {
  console.log("Build designs...")

  const designs = await API.getDesigns()
  const conversions = Object.values(designs)
    .filter(includeApiDesign)
    .map(convertDesign)

  const results = await Promise.all(conversions)

  return results
    .filter(includeDesign)
    .sort(compareDesigns)
}
