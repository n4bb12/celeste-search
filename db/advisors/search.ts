import { Advisor } from "../interfaces"
import { SearchBuilder } from "../shared/search-helpers"
import { searchByLevels, searchByVendor } from "../shared/search-tags"

export async function buildSearchString(advisor: Advisor): Promise<string> {
  const builder = new SearchBuilder()

  builder.add("advisors")

  builder.addStrict(advisor.id)
  builder.add(advisor.name)
  builder.add(`age${advisor.age}`)
  builder.add(advisor.civilization || "")

  await searchByLevels(builder, [advisor.level])
  await searchByVendor(builder, advisor.vendors)

  Object.keys(advisor.rarities).forEach(rarity => {
    builder.add(rarity)
    builder.addStrict(advisor.rarities[rarity].description)
  })

  return builder.build()
}
