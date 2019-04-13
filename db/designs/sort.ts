import { Design } from "../interfaces"

/**
 * Determines the sort order of designs in `db.json`.
 */
export function compareDesigns(a: Design, b: Design) {
  return a.name.localeCompare(b.name)
}
