import { Trait } from "celeste-api-types"
import chalk from "chalk"

export function includeItem(trait: Trait) {
  if (trait.itemlevels.length > 0) {
    return true
  }
  console.log(chalk.yellow(`SKIPPED - Item has no levels: ${trait.name} (${trait.dbid})`))
}
