import { MarketplaceItem } from "celeste-api-types"

import { Vendor } from "./Vendor"

export interface Blueprint {
  id: string
  name: string
  description: string | undefined
  icon: number
  rarity: string
  materials: Array<{ id: string, quantity: number }> | undefined
  vendors: Vendor[] | undefined
  marketplace: MarketplaceItem[] | undefined
  search: string
}
