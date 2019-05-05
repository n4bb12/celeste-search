import { Design, Trait } from "celeste-api-types"

import { API } from "../download"
import { Recipe } from "../interfaces"

import { convertRecipeSchool } from "./convert-recipe-school"

/**
 * Looks up the recipe for an item and if found, converts it
 * from the API format to the format used by the Search app.
 */
export async function findAndConvertRecipe(trait: Trait): Promise<Recipe | undefined> {
  const designs = await API.getDesigns()

  const design = Object.values(designs).find(apiDesign => {
    if (apiDesign.output.trait) {
      return apiDesign.output.trait.id === trait.name
    }
    return false
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
