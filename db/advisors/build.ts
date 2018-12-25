import { API } from "../download"
import { Advisor } from "../interfaces"

import { convertAdvisor } from "./convert-advisor"
import { compareAdvisors } from "./sort"

export async function buildAdvisors(): Promise<Advisor[]> {
  console.log("Build advisors...")

  const advisors = await API.getAdvisors()
  const conversions = Object.values(advisors).map(convertAdvisor)
  const singleAdvisors = await Promise.all(conversions)
  const mergedByName: { [name: string]: Advisor } = {}

  singleAdvisors.forEach(advisor => {
    const merged = mergedByName[advisor.name]
    const rarity = Object.keys(advisor.rarities)[0]

    if (merged) {
      merged.rarities[rarity] = advisor.rarities[rarity]
    } else {
      mergedByName[advisor.name] = advisor
    }
  })

  const result = Object.values(mergedByName).sort(compareAdvisors)

  return result
}
