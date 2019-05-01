import { MarketplaceItem } from "celeste-api-types"

import { Vendor } from "./Vendor"

export interface Consumable {
  id: string
  name: string
  description: string
  icon: number
  rarity: string
  vendors: Vendor[] | undefined
  marketplace: MarketplaceItem[] | undefined
  search: string
  searchDynamic: string | undefined
}
