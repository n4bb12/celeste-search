import { Design as ApiDesign } from "celeste-api-types"

import { Design } from "../interfaces"
import { SearchBuilder } from "../shared/search-helpers"
import { searchByMaterial, searchByVendor } from "../shared/search-tags"

export async function buildSearchString(design: Design, apiDesign: ApiDesign): Promise<string> {
  const builder = new SearchBuilder()

  builder.add("designs")

  builder.addStrict(design.id)
  builder.add(design.name)
  builder.add(design.description)
  builder.add(design.rarity)
  builder.add(design.type)

  await searchByMaterial(builder, design.materials)
  await searchByVendor(builder, design.vendors)

  return builder.build()
}
