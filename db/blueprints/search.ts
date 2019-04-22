import { Blueprint } from "../interfaces"
import { SearchBuilder } from "../shared/search-helpers"
import { searchByMaterial, searchByVendor } from "../shared/search-tags"

export async function buildSearchString(blueprint: Blueprint): Promise<string> {
  const builder = new SearchBuilder()

  builder.add(blueprint.name)
  builder.add(blueprint.description || "")
  builder.add(blueprint.rarity)

  await searchByMaterial(builder, blueprint.materials)
  await searchByVendor(builder, blueprint.vendors)

  return builder.build()
}
