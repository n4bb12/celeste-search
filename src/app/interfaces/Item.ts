import { ItemEffect } from "./ItemEffect"
import { Recipe } from "./Recipe"
import { Vendor } from "./Vendor"

export interface Item {
  id: string
  name: string
  type: string
  levels: number[]
  icon: number
  rarity: string
  effects?: ItemEffect[]
  effectsRange?: boolean
  recipe?: Recipe
  vendors?: Vendor[]
  quest?: string
  event?: {
    name: "halloween" | "winter"
    year: 2018,
  }
  starting?: string[]
  search: string
}
