import { Blueprint as ApiBlueprint } from "celeste-api-types"

import { API, downloadIcon } from "../download"
import { Blueprint } from "../interfaces"
import { translateEn } from "../shared/convert-text"
import { findAndConvertVendors } from "../shared/convert-vendors"

import { convertMaterials } from "./convert-materials"
import { buildSearchString } from "./search"

export async function convertBlueprint(blueprint: ApiBlueprint): Promise<Blueprint> {
  const prototypes = await API.getPrototypes()
  const protounit = prototypes[blueprint.protounit]
  const displaynameid = protounit && protounit.DisplayNameID
  const name = displaynameid && await translateEn(displaynameid)
    || blueprint.displaynameid && await translateEn(blueprint.displaynameid)
    || blueprint.name
  const description = await translateEn(blueprint.rollovertextid)
  const iconId = await downloadIcon(`Art/${blueprint.icon}`, "blueprints")
  const rarity = blueprint.rarity.replace("cRarity", "").toLowerCase()
  const materials = convertMaterials(blueprint)

  const result: Blueprint = {
    name,
    description,
    icon: iconId,
    rarity,
    materials,
    vendors: undefined,
    search: "",
  }

  result.vendors = await findAndConvertVendors(result)
  result.search = await buildSearchString(result)

  return result
}
