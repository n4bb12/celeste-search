import { Advisor } from "../interfaces"
import { SearchBuilder } from "../shared/search-helpers"
import { searchByLevels, searchByVendor } from "../shared/search-tags"

/**
 * Constructs a search string consisting of all keywords the
 * item can be found by.
 */
export async function buildSearchString(advisor: Advisor): Promise<string> {
  const builder = new SearchBuilder()

  builder.add(advisor.name)
  builder.addStrict(`age${advisor.age}`)
  builder.addStrict(`age ${advisor.age}`)
  builder.add(advisor.civilization || "")

  searchByLevels(builder, [advisor.level])
  searchByVendor(builder, advisor.vendors)

  Object.keys(advisor.rarities).forEach(rarity => {
    builder.add(rarity)
  })

  return builder.build()
}
