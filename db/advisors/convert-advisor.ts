import { Advisor as ApiAdvisor } from "celeste-api-types"

import { downloadIcon } from "../download"
import { Advisor } from "../interfaces"
import { translateEn } from "../shared/convert-text"
import { findAndConvertVendors } from "../shared/convert-vendors"

import { convertCivilization } from "./convert-civilization"

/**
 * Converts advisors from their API format to the format
 * used by the search app.
 */
export async function convertAdvisor(apiAdvisor: ApiAdvisor): Promise<Advisor> {
  const name = await translateEn(apiAdvisor.displaynameid)
  const description = await translateEn(apiAdvisor.displaydescriptionid)
  const iconId = await downloadIcon(apiAdvisor.icon, "advisors")

  const rarities: Advisor["rarities"] = {
    [apiAdvisor.rarity]: {
      id: apiAdvisor.name,
      icon: iconId,
      description,
    },
  }

  const advisor: Advisor = {
    name,
    age: apiAdvisor.age + 1,
    level: apiAdvisor.minlevel,
    civilization: convertCivilization(apiAdvisor.civilization),
    vendors: undefined,
    rarities,
    search: "",
  }

  advisor.vendors = await findAndConvertVendors({ name, rarity: apiAdvisor.rarity })
  advisor.search = "TODO"

  return advisor
}
