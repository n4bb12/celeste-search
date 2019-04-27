import { MarketplaceItem } from "celeste-api-types"

import { Vendor } from "./Vendor"

export interface AdvisorRarity {
  description: string
  icon: number,
}

export interface Advisor {
  id: string
  name: string
  age: number
  level: number
  civilization: string | undefined
  vendors: Vendor[] | undefined
  marketplace: MarketplaceItem[] | undefined
  rarities: {
    [index: string]: AdvisorRarity,
  }
  search: string
}
