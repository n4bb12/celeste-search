import { Vendor } from "../interfaces"
import { CanBeSold, findAndConvertVendors } from "./../shared/convert-vendors"
import { compareVendors } from "./../shared/sort-vendors"

/**
 * These can only be aquired by completing a quest.
 */
const questLegendaries = [2276]

/**
 * Starting at this ID, all items were created by the
 * celeste team.
 */
const celesteLegendariesStart = 2259

/**
 * Searches all vendors and collects the ones that sell the
 * specified item.
 */
export async function findAndConvertItemVendors(entity: CanBeSold): Promise<Vendor[]> {
  const vendors = await findAndConvertVendors(entity)

  // Is it part of the weekend legendary rotation?
  // --> Add it to the Empire Store.
  if (entity.rarity !== "legendary") {
    return vendors
  }

  // sold by regular vendor
  if (vendors.length) {
    return vendors
  }

  // craftable item
  if (entity.recipe) {
    return vendors
  }

  // quest item
  if (questLegendaries.includes(entity.id)) {
    return vendors
  }

  // winter event
  if (entity.name.endsWith("of the Ice King")) {
    return vendors
  }

  // halloween event
  if (entity.name.startsWith("Zahhak") || entity.name.startsWith("Black Cat")) {
    return vendors
  }

  const madeByCeleste = entity.id >= celesteLegendariesStart
  const rotation = madeByCeleste ? "Celeste" : "Classic"

  vendors.push({
    name: `Empire Store`,
    level: 40,
    rarity: "legendary",
    currency: "empire",
    price: (madeByCeleste ? 700 : 350),
    rotation,
  })

  vendors.sort(compareVendors)

  return vendors
}
