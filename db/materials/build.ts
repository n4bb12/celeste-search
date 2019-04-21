import { API, downloadIcon } from "../download"
import { Materials } from "../interfaces"

import { convertMaterial } from "./convert-materials"
import { currencies } from "./currencies"

export async function buildMaterials(): Promise<Materials> {
  const materials = await API.getMaterials()
  const result: Materials = {}

  for (const material of Object.values(materials)) {
    result[material.name] = await convertMaterial(material)
  }

  await Promise.all(currencies.map(c => {
    return downloadIcon(c.resource, "materials", c.iconName)
  }))

  return result
}
