import { merge } from "lodash"

import { API, downloadIcon } from "../download"
import { Advisor } from "../interfaces"
import { translateEn } from "../shared/convert-text"
import { findVendors } from "../vendors"

import { convertCivilization } from "./convert-civilization"
import { includeAdvisor } from "./filter"
import { buildSearchString } from "./search"
import { compareAdvisors } from "./sort"

export async function buildAdvisors(): Promise<Advisor[]> {
  console.log("Build advisors...")

  const mergedByName: { [name: string]: Advisor } = {}
  const advisors = await API.getAdvisors()

  for (const advisor of Object.values(advisors)) {
    const name = await translateEn(advisor.displaynameid, advisor.name)
    const description = await translateEn(advisor.displaydescriptionid, "")
    const icon = await downloadIcon(`Art/${advisor.icon}`, "advisors")
    const civilization = convertCivilization(advisor.civilization)

    const rarity: Advisor["rarities"][string] = {
      id: advisor.name.toLowerCase(),
      icon,
      description,
    }

    const rarities: Advisor["rarities"] = {
      [advisor.rarity]: rarity,
    }

    const result: Advisor = {
      id: rarity.id.replace(/_.+/, ""),
      name,
      age: advisor.age + 1,
      level: advisor.minlevel,
      civilization,
      rarities,
      vendors: undefined,
      marketplace: undefined,
      search: "",
      searchDynamic: undefined,
    }
    result.vendors = await findVendors(rarity.id)

    const merged = merge(mergedByName[name], result)
    merged.search = await buildSearchString(merged)

    mergedByName[name] = merged
  }

  return Object.values(mergedByName)
    .filter(includeAdvisor)
    .sort(compareAdvisors)
}
