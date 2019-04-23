/**
 * Maps the old crafting school names to the new ones that
 * are actually displayed ingame.
 */
const map = {
  Construction: "Construction",
  Craftsmen: "Craftsmen",
  Engineering: "Engineering",
  HorseBreeding: "Cavalry",
  Metalworking: "Metalworking",
  MilitaryCollege: "Infantry",
  Religion: "Religion",
  Woodscraft: "Archery",
}

/**
 * Converts crafting schools names from their API format to
 * the format used by the Search app.
 */
export function convertRecipeSchool(name: string): string {
  if (!map[name]) {
    throw new Error(name)
  }
  return map[name]
}
