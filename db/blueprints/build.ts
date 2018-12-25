import { API } from "../download"
import { Blueprint } from "../interfaces"

import { convertBlueprint } from "./convert-blueprint"
import { compareBlueprints } from "./sort"

export async function buildBlueprints(): Promise<Blueprint[]> {
  console.log("Build blueprints...")

  const blueprints = await API.getBlueprints()
  const conversions = Object.values(blueprints).map(convertBlueprint)
  const result = await Promise.all(conversions)

  return result.sort(compareBlueprints)
}
