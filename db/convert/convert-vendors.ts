import { API } from "../download"
import { Vendor } from "../interfaces/app"

interface CanBeSold {
  id?: number
  name: string
  rarity: string
}

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
export async function findAndConvertVendors(entity: CanBeSold, type: "item" | "advisor"): Promise<Vendor[]> {
  const stores = await API.getStores()
  const vendors: Vendor[] = []

  stores.forEach(store => {
    const soldItem = store.items.find(storeItem => storeItem.name === entity.name)

    if (soldItem) {
      vendors.push({
        name: store.name,
        level: soldItem.level,
        rarity: soldItem.quality,
        currency: store.currency || soldItem.currency,
        price: soldItem.price,
      })
    }
  })

  // Is it part of the weekend legendary rotation?
  // --> Add it to the Empire Store.
  if (type === "item") {
    if (entity.rarity === "legendary") {
      if (!vendors.length) {
        if (!questLegendaries.includes(entity.id)) {
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
        }
      }
    }
  }

  if (!vendors.length) {
    return
  }

  vendors.sort((a, b) => b.level - a.level)

  return vendors
}
