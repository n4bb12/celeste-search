import { API } from "../download"
import { Entity, Vendor } from "../interfaces"

import { compareVendors } from "./sort-vendors"

/**
 * Searches all vendors and collects the ones that sell the
 * specified item.
 */
export async function findAndConvertVendors(entity: Entity): Promise<Vendor[] | undefined> {
  const stores = await API.getStores()
  const vendors: Vendor[] = []

  stores.forEach(store => {
    const soldItem = store.items.find(storeItem => storeItem.name === entity.name)

    if (soldItem) {
      vendors.push({
        name: store.name,
        level: soldItem.level,
        rarity: soldItem.quality,
        currency: store.currency || soldItem.currency!,
        price: soldItem.price,
      })
    }
  })

  vendors.sort(compareVendors)

  return vendors.length ? vendors : undefined
}
