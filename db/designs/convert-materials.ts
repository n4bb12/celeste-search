import { Design } from "celeste-api-types"

export function convertMaterials(design: Design) {
  const materials = design.input.material.map(mat => {
    return {
      id: mat.id,
      quantity: mat.quantity,
    }
  })
  return materials.length ? materials : undefined
}
