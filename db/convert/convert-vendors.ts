import { API } from "../download"
import { Item, Vendor } from "../interfaces/app"

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
export async function findAndConvertVendors(item: Item): Promise<Vendor[]> {
  const stores = await downloadApiResource<Stores>("/stores")
  const vendors: Vendor[] = []

  stores.data.forEach(store => {
    const isSoldBy = store.items.find(storeItem => storeItem.name === item.name)

    if (isSoldBy) {
      vendors.push({
        name: store.name,
        level: isSoldBy.level,
        currency: store.currency || isSoldBy.currency,
        price: isSoldBy.price,
      })
    }
  })

  // Is it part of the weekend legendary rotation?
  // --> Add it to the Empire Store.
  if (item.rarity === "legendary") {
    if (!vendors.length) {
      if (!questLegendaries.includes(item.id)) {
        const madeByCeleste = item.id >= celesteLegendariesStart
        const rotation = madeByCeleste ? "Celeste" : "Classic"

        vendors.push({
          name: `Empire Store`,
          level: 40,
          currency: "empire",
          price: (madeByCeleste ? 700 : 350),
          rotation,
        })
      }
    }
  }

  if (!vendors.length) {
    return
  }

  vendors.sort((a, b) => b.level - a.level)

  return vendors
}
