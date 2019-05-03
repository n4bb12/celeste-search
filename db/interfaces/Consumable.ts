import { MarketplaceQuery } from "./MarketplaceQuery"
import { Vendor } from "./Vendor"

export interface Consumable {
  id: string
  name: string
  description: string
  icon: number
  rarity: string
  vendors: Vendor[] | undefined
  search: string
  marketplace: MarketplaceQuery[]
}
