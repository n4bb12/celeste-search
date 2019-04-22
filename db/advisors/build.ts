import { API } from "../download"
import { Advisor } from "../interfaces"
import { findAndConvertVendors } from "../shared/convert-vendors"

import { convertAdvisor } from "./convert-advisor"
import { includeAdvisor } from "./filter"
import { buildSearchString } from "./search"
import { compareAdvisors } from "./sort"

export async function buildAdvisors(): Promise<Advisor[]> {
  console.log("Build advisors...")

  const advisors = await API.getAdvisors()
  const conversions = Object.values(advisors).map(convertAdvisor)
  const singleAdvisors = await Promise.all(conversions)
  const mergedByName: { [name: string]: Advisor } = {}

  singleAdvisors.forEach(advisor => {
    const merged = mergedByName[advisor.name]

    if (merged) {
      merged.rarities = { ...merged.rarities, ...advisor.rarities }
    } else {
      mergedByName[advisor.name] = advisor
    }
  })

  const result = Object.values(mergedByName)

  for (const advisor of result) {
    advisor.vendors = await findAndConvertVendors(advisor)
    advisor.search = await buildSearchString(advisor)
  }

  return result
    .filter(includeAdvisor)
    .sort(compareAdvisors)
}
