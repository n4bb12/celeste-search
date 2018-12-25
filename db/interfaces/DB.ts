import { Advisor } from "./Advisor"
import { Blueprint } from "./Blueprint"
import { Consumable } from "./Consumable"
import { Design } from "./Design"
import { Item } from "./Item"
import { Materials } from "./Material"

export interface DB {
  materials: Materials
  items: Item[]
  advisors: Advisor[]
  blueprints: Blueprint[]
  designs: Design[]
  consumables: Consumable[]
  replace: { [key: string]: string }
}
