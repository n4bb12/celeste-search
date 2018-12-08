import { Item } from "./Item"
import { Material } from "./Material"

export interface Materials {
  [key: string]: Material
}

export interface DB {
  items: Item[]
  materials: Materials
  replace: { [key: string]: string }
}
