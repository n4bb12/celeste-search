import { identity, uniq } from "lodash"

export const WORD_SEPARATOR = "_"

export class SearchBuilder {
  private words: string[] = []

  add(value: string | number) {
    this.addStrict(value)
    this.words.push(simplify(`${value}`))
  }

  addStrict(value: string | number) {
    if (value === undefined || value === null) {
      throw new Error(`Attempted to add search word '${value}' to `
        + JSON.stringify(this.words))
    }
    this.words.push(`${value}`)
  }

  build() {
    const cleaned = this.words
      .filter(identity)
      .join(" ")
      .trim()
      .toLowerCase()
      .split(/\s+/)

    const unique = uniq(cleaned)
      .filter(word => !cleaned.some(other => other !== word && other.includes(word)))

    const result = unique
      .sort()
      .join(" ")

    return result
  }

}

export function simplify(text: string) {
  return (text || "")
    .replace(/["']/g, "")
    .replace(/[^a-zA-Z0-9"]/gi, " ")
    .replace(/\s+/, " ")
    .trim()
}
