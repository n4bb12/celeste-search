import { uniq } from "lodash"

import { API, downloadIcon } from "../download"
import { Blueprint, Design, Item, Materials } from "../interfaces"

import { convertMaterial } from "./convert-material"
import { currencies } from "./currencies"

export async function buildMaterials(
  items: Item[],
  blueprints: Blueprint[],
  designs: Design[],
): Promise<Materials> {

  const itemMats = items.reduce((ids, item) => {
    return ids.concat(item.recipe ? item.recipe.materials.map(mat => mat.id) : [])
  }, [] as string[])
  const blueprintMats = blueprints.reduce((ids, blueprint) => {
    return ids.concat((blueprint.materials || []).map(mat => mat.id))
  }, [] as string[])
  const designMats = designs.reduce((ids, design) => {
    return ids.concat((design.materials || []).map(mat => mat.id))
  }, [] as string[])

  console.log(JSON.stringify(uniq(itemMats), null, 2))

  const allUsedMaterials = uniq([
    ...itemMats,
    ...blueprintMats,
    ...designMats,
  ])

  const materials = await API.getMaterials()
  const result: Materials = {}

  for (const material of Object.values(materials)) {
    if (allUsedMaterials.includes(material.name)) {
      result[material.name] = await convertMaterial(material)
    }
  }

  await Promise.all(currencies.map(c => {
    return downloadIcon(c.resource, "materials", c.iconName)
  }))

  return result
}
