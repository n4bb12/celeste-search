import { Blueprint as ApiBlueprint } from "celeste-api-types"

import { API, downloadIcon } from "../download"
import { Blueprint } from "../interfaces"
import { translateEn } from "../shared/convert-text"
import { findVendors } from "../vendors"

import { convertMaterials } from "./convert-materials"
import { buildSearchString } from "./search"

export async function convertBlueprint(blueprint: ApiBlueprint): Promise<Blueprint> {
  const prototypes = await API.getPrototypes()

  // unfortunately, casing is not always consistent
  Object.keys(prototypes).forEach(protoId => {
    prototypes[protoId.toLowerCase()] = prototypes[protoId]
  })

  const proto = prototypes[blueprint.protounit.toLowerCase()]
  const name = await translateEn(proto.DisplayNameID!, blueprint.name)
  const description = await translateEn(blueprint.rollovertextid)
  const icon = await downloadIcon(`Art/${blueprint.icon}`, "blueprints")
  const rarity = blueprint.rarity.replace("cRarity", "").toLowerCase()
  const materials = convertMaterials(blueprint)

  const result: Blueprint = {
    id: blueprint.name.toLowerCase(),
    name,
    description,
    icon,
    rarity,
    materials,
    vendors: undefined,
    marketplace: undefined,
    search: "",
    searchDynamic: undefined,
  }

  result.vendors = await findVendors(result.id)
  result.search = await buildSearchString(result)

  return result
}
