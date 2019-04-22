import chalk from "chalk"
import { identity, uniq } from "lodash"

export const WORD_SEPARATOR = "_"

export class SearchBuilder {
  private words: string[] = []

  add(value: string | number) {
    const word = `${value}`
    this.words.push(word)
    this.words.push(simplify(word))
    this.addStrict(value)
  }

  addStrict(value: string | number) {
    const word = `${value}`
    this.words.push(word.replace(/\s+/g, WORD_SEPARATOR))
    this.words.push(simplify(word).replace(/\s+/g, WORD_SEPARATOR))
  }

  build() {
    const result = uniq(
      this.words
        .filter(identity)
        .join(" ")
        .trim()
        .toLowerCase()
        .split(/\s+/))
      .sort()
      .join(" ")

    if (result.includes("undefined")) {
      throw new Error(result.replace(/undefined/g, chalk.red("undefined")))
    }

    return result
  }

}

export function simplify(text: string, characters: string = "a-zA-Z0-9") {
  return (text || "")
    .replace(/'/, "")
    .replace(new RegExp(`[^${characters} ]`, "gi"), " ")
    .replace(/\s+/, " ")
    .trim()
}
