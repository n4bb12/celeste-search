import { MarketplaceQuery } from "./MarketplaceQuery"
import { Vendor } from "./Vendor"

export interface AdvisorRarity {
  id: string
  description: string
  icon: number,
}

export interface Advisor {
  // static
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

  // dynamic
  marketplace: MarketplaceQuery[]
  searchDynamic: string | undefined
}
