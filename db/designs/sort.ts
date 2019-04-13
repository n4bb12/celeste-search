import { Design, RARITIES } from "../interfaces"

/**
 * Determines the sort order of designs in `db.json`.
 */
export function compareDesigns(a: Design, b: Design) {
  const aRarities = Object.keys(a.rarities)
  const bRarities = Object.keys(b.rarities)

  const aMaxRarity = aRarities[aRarities.length - 1]
  const bMaxRarity = bRarities[bRarities.length - 1]

  if (aMaxRarity !== bMaxRarity) {
    const aRarityIndex = RARITIES.indexOf(aMaxRarity)
    const bRarityIndex = RARITIES.indexOf(bMaxRarity)
    return aRarityIndex - bRarityIndex
  }

  return a.name.localeCompare(b.name)
}
