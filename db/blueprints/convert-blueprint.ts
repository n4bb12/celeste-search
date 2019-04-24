import { Blueprint as ApiBlueprint } from "celeste-api-types"

import { API, downloadIcon } from "../download"
import { Blueprint } from "../interfaces"
import { translateEn } from "../shared/convert-text"
import { findVendors } from "../vendors"

import { convertMaterials } from "./convert-materials"
import { buildSearchString } from "./search"

export async function convertBlueprint(blueprint: ApiBlueprint): Promise<Blueprint> {
  const prototypes = await API.getPrototypes()
  const proto = prototypes[blueprint.protounit]
  const displaynameid = proto && proto.DisplayNameID
  const name = displaynameid && await translateEn(displaynameid)
    || blueprint.displaynameid && await translateEn(blueprint.displaynameid)
    || blueprint.name
  const description = await translateEn(blueprint.rollovertextid)
  const iconId = await downloadIcon(`Art/${blueprint.icon}`, "blueprints")
  const rarity = blueprint.rarity.replace("cRarity", "").toLowerCase()
  const materials = convertMaterials(blueprint)

  const result: Blueprint = {
    id: blueprint.name,
    name,
    description,
    icon: iconId,
    rarity,
    materials,
    vendors: undefined,
    search: "",
  }

  result.vendors = await findVendors(result)
  result.search = await buildSearchString(result)

  return result
}
