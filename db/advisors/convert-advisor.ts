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
export async function convertAdvisor(advisor: ApiAdvisor): Promise<Advisor> {
  const name = await translateEn(advisor.displaynameid)
  const description = await translateEn(advisor.displaydescriptionid)
  const iconId = await downloadIcon(advisor.icon, "advisors")
  const civilization = convertCivilization(advisor.civilization)

  const rarities: Advisor["rarities"] = {
    [advisor.rarity]: {
      id: advisor.name,
      icon: iconId,
      description,
    },
  }

  const result: Advisor = {
    name,
    age: advisor.age + 1,
    level: advisor.minlevel,
    civilization,
    rarities,
    vendors: undefined,
    search: undefined,
  }

  result.vendors = await findAndConvertVendors({ name, rarity: advisor.rarity })
  result.search = "TODO"

  return result
}
