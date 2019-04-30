import chalk from "chalk"

import { Item } from "../interfaces"

export function includeItem(item: Item) {
  if (!item.levels.length) {
    console.log(chalk.yellow(`SKIPPED - Item has no levels:`, `${item.name} (${item.id})`))
    return false
  }
  return true
}
