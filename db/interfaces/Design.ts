import { MarketplaceItem } from "celeste-api-types"

import { Vendor } from "./Vendor"

export interface Design {
  id: string
  description: string
  icon: number
  rarity: string
  materials: Array<{ id: string, quantity: number }> | undefined
  school: string
  vendors: Vendor[] | undefined
  marketplace: MarketplaceItem[] | undefined
  outputId: string
  outputName: string
  outputIcon: number
  search: string
}
