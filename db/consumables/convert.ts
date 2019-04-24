import { Consumable } from "../interfaces"
import { translateEn } from "../shared/convert-text"

import { buildSearchString } from "./search"

export async function convertConsumable(consumable: any): Promise<Consumable> {
  const name = await translateEn(consumable.displaynameid, consumable.name)

  const result: Consumable = {
    id: consumable.name,
    name,
    search: "",
  }

  result.search = await buildSearchString(result)

  return result
}
