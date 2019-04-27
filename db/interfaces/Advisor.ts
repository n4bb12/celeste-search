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
  rarities: {
    [index: string]: AdvisorRarity,
  }
  search: string
}
