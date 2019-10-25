import { Blueprint, RARITIES } from "../interfaces"

export function compareBlueprints(a: Blueprint, b: Blueprint) {
  if (a.rarity !== b.rarity) {
    const aRarityIndex = RARITIES.indexOf(a.rarity)
    const bRarityIndex = RARITIES.indexOf(b.rarity)
    return aRarityIndex - bRarityIndex
  }
  if (a.name !== b.name) {
    return a.name.localeCompare(b.name)
  }
  return a.id.localeCompare(b.id)
}
