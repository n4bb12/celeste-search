import { downloadApiResource } from "../download"
import { Design, Designs } from "../interfaces/api"
import { Item, Recipe } from "../interfaces/app"

import { convertRecipeSchool } from "./convert-recipe-school"

/**
 * Looks up the recipe for an item and if found, converts it
 * from the API format to the format used by the item search app.
 */
export async function findAndConvertRecipe(item: Item): Promise<Recipe> {
  const designs = await downloadApiResource<Designs>("/game/designs")

  const design: Design = Object.values(designs.data)
    .find(apiDesign => {
      if (apiDesign.output.trait) {
        return apiDesign.output.trait.id.toLowerCase() === item.trait.toLowerCase()
      }
    })

  if (!design) {
    return
  }

  const recipe: Recipe = {
    school: convertRecipeSchool(design.tag),
    level: design.output.trait.level - 3,
    materials: design.input.material.map(mat => {
      return {
        id: mat.id,
        quantity: mat.quantity,
      }
    }),
  }

  return recipe
}
