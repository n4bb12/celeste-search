export interface LootRoll {
  name: string
  icon: string
  rollovertextid: number
  displaynameid: number
  itemlevel: number
  rarity: string
  loottable: string
}

export interface LootRolls {
  timestamp: string
  data: {
    [index: string]: LootRoll,
  }
}
