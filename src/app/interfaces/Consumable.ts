import { MarketplaceQuery } from "./MarketplaceQuery"
import { Vendor } from "./Vendor"

export interface Consumable {
  // static
  id: string
  name: string
  description: string
  icon: number
  rarity: string
  vendors: Vendor[] | undefined
  search: string

  // dynamic
  marketplace: MarketplaceQuery[]
  searchDynamic: string | undefined
}
