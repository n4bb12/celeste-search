import { MarketplaceQuery } from "./MarketplaceQuery"
import { Vendor } from "./Vendor"

export interface Blueprint {
  id: string
  name: string
  description: string | undefined
  icon: number
  rarity: string
  materials: Array<{ id: string, quantity: number }> | undefined
  vendors: Vendor[] | undefined
  search: string
  marketplace: MarketplaceQuery[]
}
