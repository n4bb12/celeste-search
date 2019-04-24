import { isEqual, uniqWith } from "lodash"

import { API } from "../download"
import { Entity, Vendor } from "../interfaces"
import { translateEn } from "../shared/convert-text"

import { convertCurrency } from "./convert-currency"
import { convertRarity } from "./convert-rarity"
import { compareVendors } from "./sort"

/**
 * Searches all vendors and collects the ones that sell the
 * specified item.
 */
export async function findVendors(entity: Entity): Promise<Vendor[] | undefined> {
  const result: Vendor[] = []

  const vendors = await API.getVendors()
  const prototypes = await API.getPrototypes()

  // unfortunately, casing is not always consistent
  Object.keys(prototypes).forEach(id => {
    prototypes[id.toLowerCase()] = prototypes[id]
  })

  for (const vendor of Object.values<any>(vendors)) {
    const items = vendor.itemsets.itemset.items.item

    for (const item of Object.values<any>(items)) {
      const p = item.purchase
      const sold =
        p.trait ||
        p.advisor ||
        p.blueprint ||
        p.design ||
        p.consumable ||
        p.material ||
        p.lootroll ||
        p.quest

      if (entity.id === sold.id) {
        const c = item.cost
        const price =
          c.capitalresource ||
          c.gamecurrency

        const proto = prototypes[vendor.protounit.toLowerCase()]
        const name = proto.DisplayNameID && await translateEn(proto.DisplayNameID) || vendor.protounit

        if (!price) {
          console.log(item)
        }

        result.push({
          name,
          level: sold.level - 3,
          rarity: convertRarity(sold.id),
          currency: convertCurrency(price.type),
          price: price.quantity,
        })
      }
    }
  }

  const unique = uniqWith(result, isEqual)
  unique.sort(compareVendors)

  return unique.length ? unique : undefined
}
