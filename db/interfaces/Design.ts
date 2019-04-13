import { Vendor } from "./Vendor"

export interface Design {
  name: string
  description: string
  icon: number
  rarity: string
  materials: Array<{ id: string, quantity: number }>
  vendors?: Vendor[]
  search: string
}
