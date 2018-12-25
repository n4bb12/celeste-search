import { Blueprint as ApiBlueprint } from "celeste-api-types"

import { API, downloadIcon } from "../download"
import { Blueprint } from "../interfaces"
import { translateEn } from "../shared/convert-text"
import { findAndConvertVendors } from "../shared/convert-vendors"

export async function convertBlueprint(blueprint: ApiBlueprint): Promise<Blueprint> {
  // const name = await translateEn(blueprint.displaynameid)
  const name = blueprint.name // FIXME
  const description = await translateEn(blueprint.rollovertextid)
  const iconId = await downloadIcon(blueprint.icon, "blueprints")
  const rarity = blueprint.rarity.replace("cRarity", "").toLowerCase()

  const result: Blueprint = {
    name,
    description,
    icon: iconId,
    rarity,
    materials: blueprint.cost.material.map(mat => {
      return {
        id: mat.id,
        quantity: mat.quantity,
      }
    }),
    vendors: undefined,
    search: undefined,
  }

  result.vendors = await findAndConvertVendors(result)
  result.search = "TODO"

  return result
}
