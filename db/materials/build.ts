import { API, downloadIcon } from "../download"
import { Materials } from "../interfaces"

import { convertMaterial } from "./convert-materials"

const currencies = [
  {
    resource: "UserInterface/CapCity/Coin_ua",
    iconName: "coin",
  },
  {
    resource: "UserInterface/CapCity/Button_EmpireStore",
    iconName: "empire",
  },
  {
    resource: "UserInterface/Map/UI_Region_Shortcuts/RegionShieldCrete_Normal_ua",
    iconName: "crete",
  },
  {
    resource: "UserInterface/Map/UI_Region_Shortcuts/RegionShieldSparta_Normal_ua",
    iconName: "sparta",
  },
]

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
