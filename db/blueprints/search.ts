import { Blueprint } from "../interfaces"
import { SearchBuilder } from "../shared/search-helpers"
import { searchByMaterial, searchByVendor } from "../shared/search-tags"

/**
 * Constructs a search string consisting of all keywords the
 * item can be found by.
 */
export async function buildSearchString(blueprint: Blueprint): Promise<string> {
  const builder = new SearchBuilder()

  builder.add(blueprint.name)
  builder.add(blueprint.description || "")
  builder.add(blueprint.rarity)

  searchByVendor(builder, blueprint.vendors)
  searchByMaterial(builder, blueprint.materials)

  return builder.build()
}
