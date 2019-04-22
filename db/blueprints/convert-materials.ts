import { Blueprint } from "celeste-api-types"

export function convertMaterials(blueprint: Blueprint) {
  const materials = blueprint.cost.material.map(mat => {
    return {
      id: mat.id,
      quantity: mat.quantity,
    }
  })
  return materials.length ? materials : undefined
}
