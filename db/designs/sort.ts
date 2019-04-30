import { Design } from "../interfaces"

export function compareDesigns(a: Design, b: Design) {
  return a.outputName.localeCompare(b.outputName)
}
