import { downloadIcon } from "../download"
import { Consumable } from "../interfaces"
import { translateEn } from "../shared/convert-text"

import { buildSearchString } from "./search"

export async function convertConsumable(consumable: any): Promise<Consumable> {
  const name = await translateEn(consumable.displaynameid, consumable.name)
  const description = await translateEn(consumable.rollovertextid, "")
  const iconId = await downloadIcon(`Art/${consumable.icon}`, "blueprints")
  const rarity = consumable.rarity.replace("cRarity", "").toLowerCase()

  const result: Consumable = {
    id: consumable.name,
    name,
    description,
    icon: iconId,
    rarity,
    vendors: undefined,
    marketplace: undefined,
    search: "",
  }

  result.search = await buildSearchString(result)

  return result
}
