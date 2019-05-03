import { MarketplaceQuery } from "./MarketplaceQuery"
import { Vendor } from "./Vendor"

export interface Design {
  // static
  id: string
  description: string
  icon: number
  rarity: string
  materials: Array<{ id: string, quantity: number }> | undefined
  school: string
  vendors: Vendor[] | undefined
  outputId: string
  outputName: string
  outputIcon: number
  search: string

  // dynamic
  marketplace: MarketplaceQuery[]
  searchDynamic: string | undefined
}
