import { Advisor } from "../interfaces/app"

export const rarities = ["legendary", "epic", "rare", "uncommon", "common"]

/**
 * Determines the sort order of items in `db.json`.
 */
export function compareAdvisors(a: Advisor, b: Advisor) {
  const aRarities = Object.keys(a.rarities)
  const bRarities = Object.keys(b.rarities)

  const aMaxRarity = aRarities[aRarities.length - 1]
  const bMaxRarity = bRarities[bRarities.length - 1]

  if (aMaxRarity !== bMaxRarity) {
    const aRarityIndex = rarities.indexOf(aMaxRarity)
    const bRarityIndex = rarities.indexOf(bMaxRarity)
    return aRarityIndex - bRarityIndex
  }

  return a.name.localeCompare(b.name)
}
