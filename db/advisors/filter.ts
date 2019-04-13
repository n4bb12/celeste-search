import chalk from "chalk"

import { Advisor } from "../interfaces"

export function includeAdvisor(advisor: Advisor) {
  if (!advisor.age) {
    console.log(chalk.yellow(`SKIPPED - Advisor has no age:`), advisor)
    return false
  }
  return true
}
