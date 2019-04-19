import { ItemEffect } from "./ItemEffect"
import { Recipe } from "./Recipe"
import { Vendor } from "./Vendor"

export interface Item {
  id: number
  name: string
  type: string
  levels: number[]
  icon: number
  rarity: string
  effects: ItemEffect[]
  effectsRange?: boolean
  recipe?: Recipe
  vendors?: Vendor[]
  search: string
}
