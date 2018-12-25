/**
 * Transforms search string in the same way user input is
 * simplified in the search app.
 */
export function preprocessSearch(input: string): string {
  return input.toLowerCase()
    .replace(/'/, "")
    .replace(/[^a-zA-Z0-9\.]/g, " ")
    .replace(/\s+/g, " ")
}
