import { Consumable } from "../interfaces"
import { SearchBuilder } from "../shared/search-helpers"

export async function buildSearchString(consumable: Consumable): Promise<string> {
  const builder = new SearchBuilder()

  builder.add(consumable.name)

  return builder.build()
}
