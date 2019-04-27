import { API } from "../download"
import { Blueprint } from "../interfaces"

import { convertBlueprint } from "./convert"
import { includeBlueprint } from "./filter"
import { compareBlueprints } from "./sort"

export async function buildBlueprints(): Promise<Blueprint[]> {
  console.log("Build blueprints...")

  const blueprints = await API.getBlueprints()
  const conversions = Object.values(blueprints).map(convertBlueprint)
  const result = await Promise.all(conversions)

  return result
    .filter(includeBlueprint)
    .sort(compareBlueprints)
}
