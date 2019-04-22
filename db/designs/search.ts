import { Design } from "../interfaces"
import { SearchBuilder } from "../shared/search-helpers"
import { searchByMaterial, searchByVendor } from "../shared/search-tags"

export async function buildSearchString(design: Design): Promise<string> {
  const builder = new SearchBuilder()

  builder.add(design.name)
  builder.add(design.description)
  builder.add(design.rarity)

  await searchByMaterial(builder, design.materials)
  await searchByVendor(builder, design.vendors)

  return builder.build()
}
