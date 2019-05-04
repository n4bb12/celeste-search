import { MarketplaceQuery } from "./MarketplaceQuery"
import { Vendor } from "./Vendor"

export interface Consumable {
  id: string
  name: string
  description: string
  icon: string
  rarity: string
  vendors: Vendor[] | undefined
  search: string
  marketplace: MarketplaceQuery[]
}
