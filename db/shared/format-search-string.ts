import chalk from "chalk"
import { identity, uniq } from "lodash"

export function formatSearchString(words: string[]) {
  const search = uniq(
    words
      .filter(identity)
      .join(" ")
      .trim()
      .toLowerCase()
      .split(/\s+/))
    .sort()
    .join(" ")

  if (search.indexOf("undefined") >= 0) {
    throw new Error(search.replace(/undefined/g, chalk.red("undefined")))
  }

  return search
}
