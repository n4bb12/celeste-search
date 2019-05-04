import { MarketplaceQuery } from "./MarketplaceQuery"
import { Vendor } from "./Vendor"

export interface AdvisorRarity {
  id: string
  description: string
  icon: string,
}

export interface Advisor {
  id: string
  name: string
  age: number
  level: number
  civilization: string | undefined
  vendors: Vendor[] | undefined
  rarities: {
    [index: string]: AdvisorRarity,
  }
  search: string
  marketplace: MarketplaceQuery[]
}
