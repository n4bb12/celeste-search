import { Advisor as ApiAdvisor } from "celeste-api-types"

import { downloadIcon } from "../download"
import { Advisor } from "../interfaces/app"

import { translateEn } from "./convert-text"
import { findAndConvertVendors } from "./convert-vendors"

/**
 * Converts advisors from their API format to the format
 * used by the search app.
 */
export async function convertAdvisor(apiAdvisor: ApiAdvisor): Promise<Advisor> {
  const name = await translateEn(apiAdvisor.displaynameid)
  const description = await translateEn(apiAdvisor.displaydescriptionid)
  const iconId = await downloadIcon(apiAdvisor.icon, "advisors")

  const advisor: Advisor = {
    name,
    age: apiAdvisor.age + 1,
    level: apiAdvisor.minlevel,
    vendors: undefined,
    rarities: {
      [apiAdvisor.rarity]: {
        id: apiAdvisor.name,
        icon: iconId,
        description,
      },
    },
    search: "",
  }

  advisor.vendors = await findAndConvertVendors({
    name,
    rarity: apiAdvisor.rarity,
  }, "advisor")

  return advisor
}
