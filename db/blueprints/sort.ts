import { Blueprint, RARITIES } from "../interfaces"

export function compareBlueprints(a: Blueprint, b: Blueprint) {
  const aRarity = a.rarity
  const bRarity = b.rarity

  if (aRarity !== bRarity) {
    const aRarityIndex = RARITIES.indexOf(aRarity)
    const bRarityIndex = RARITIES.indexOf(bRarity)
    return aRarityIndex - bRarityIndex
  }

  return a.name.localeCompare(b.name)
}
