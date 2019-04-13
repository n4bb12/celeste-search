import chalk from "chalk"

import { Blueprint } from "../interfaces"

export function includeBlueprint(blueprint: Blueprint) {
  if (!blueprint.name) {
    console.log(chalk.yellow(`SKIPPED - Blueprint has no name:`), blueprint)
    return false
  }
  // if (!blueprint.description) {
  //   console.log(chalk.yellow(`SKIPPED - Blueprint has no description:`), blueprint)
  //   return false
  // }
  return true
}
