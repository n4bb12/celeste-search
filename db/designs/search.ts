import { Design as ApiDesign } from "celeste-api-types"

import { Design } from "../interfaces"
import { SearchBuilder } from "../shared/search-helpers"
import { searchByMaterial, searchByVendor } from "../shared/search-tags"

export async function buildSearchString(design: Design, apiDesign: ApiDesign): Promise<string> {
  const builder = new SearchBuilder()

  builder.add("designs")

  builder.addStrict(design.id)
  builder.add(design.description)
  builder.add(design.rarity)
  builder.add(design.type)
  builder.add(design.outputId)
  builder.add(design.outputName)

  if (design.outputLevel) {
    builder.add(design.outputLevel)
  }

  await searchByMaterial(builder, design.materials)
  await searchByVendor(builder, design.vendors)

  return builder.build()
}
