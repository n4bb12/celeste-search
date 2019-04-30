import { Design, RARITIES } from "../interfaces"

export function compareDesigns(a: Design, b: Design) {
  const aRarity = a.rarity
  const bRarity = b.rarity

  if (aRarity !== bRarity) {
    const aRarityIndex = RARITIES.indexOf(aRarity)
    const bRarityIndex = RARITIES.indexOf(bRarity)
    return aRarityIndex - bRarityIndex
  }

  return a.outputName.localeCompare(b.outputName)
}
