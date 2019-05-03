import { ItemEffect } from "./ItemEffect"
import { MarketplaceQuery } from "./MarketplaceQuery"
import { Recipe } from "./Recipe"
import { Vendor } from "./Vendor"

export interface Item {
  id: string
  name: string
  type: string
  levels: number[]
  icon: number
  rarity: string
  effects: ItemEffect[] | undefined
  effectsRange: boolean | undefined
  recipe: Recipe | undefined
  vendors: Vendor[] | undefined
  quest: string | undefined
  event: {
    name: "halloween" | "winter"
    year: 2018,
  } | undefined
  starting: string[] | undefined
  search: string
  marketplace: MarketplaceQuery[]
}
