import { Design } from "../interfaces"

export function compareDesigns(a: Design, b: Design) {
  return a.name.localeCompare(b.name)
}
