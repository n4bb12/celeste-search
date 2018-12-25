import { Item } from "../interfaces"

export const rarities = ["legendary", "epic", "rare", "uncommon", "common"]

/**
 * Determines the sort order of items in `db.json`.
 */
export function compareItems(a: Item, b: Item) {
  const aMaxLevel = a.levels[a.levels.length - 1] || 0
  const bMaxLevel = b.levels[b.levels.length - 1] || 0

  if (aMaxLevel !== bMaxLevel) {
    return bMaxLevel - aMaxLevel
  }

  if (a.rarity !== b.rarity) {
    const aRarityIndex = rarities.indexOf(a.rarity)
    const bRarityIndex = rarities.indexOf(b.rarity)
    return aRarityIndex - bRarityIndex
  }

  if (a.type !== b.type) {
    return a.type.localeCompare(b.type)
  }

  return a.name.localeCompare(b.name)
}
