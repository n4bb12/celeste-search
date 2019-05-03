import { MarketplaceQuery } from "./MarketplaceQuery"
import { Vendor } from "./Vendor"

export interface Blueprint {
  // static
  id: string
  name: string
  description: string | undefined
  icon: number
  rarity: string
  materials: Array<{ id: string, quantity: number }> | undefined
  vendors: Vendor[] | undefined
  search: string

  // dynamic
  marketplace: MarketplaceQuery[]
  searchDynamic: string | undefined
}
