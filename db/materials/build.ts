import { API, downloadIcon } from "../download"
import { Materials } from "../interfaces"

import { convertMaterial } from "./convert-materials"

const currencies = [
  {
    resource: "Art/UserInterface/CapCity/Coin_ua",
    iconName: "coin",
  },
  {
    resource: "Art/UserInterface/CapCity/Button_EmpireStore",
    iconName: "empire",
  },
  {
    resource: "Art/UserInterface/Map/UI_Region_Shortcuts/RegionShieldCrete_Normal_ua",
    iconName: "crete",
  },
  {
    resource: "Art/UserInterface/Map/UI_Region_Shortcuts/RegionShieldSparta_Normal_ua",
    iconName: "sparta",
  },
  {
    resource: "Art/Celeste/HalloweenEvent/HalloweenPoints_ua",
    iconName: "halloween",
  },
  {
    resource: "Art/Celeste/WinterEvent/WinterPoints_ua",
    iconName: "winter",
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
