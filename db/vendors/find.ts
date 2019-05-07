import { isEqual, uniqWith } from "lodash"

import { API } from "../download"
import { Vendor } from "../interfaces"
import { translateEn } from "../shared/convert-text"

import { convertCurrency } from "./convert-currency"
import { vendorLocations } from "./locations"
import { compareVendors } from "./sort"

/**
 * Searches all vendors and collects the ones that sell the
 * specified item.
 */
export async function findVendors(id: string): Promise<Vendor[] | undefined> {
  const results: Vendor[] = []

  const vendors = await API.getVendors()
  const prototypes = await API.getPrototypes()

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

      if (id === sold.id) {
        const c = item.cost
        const price =
          c.capitalresource ||
          c.gamecurrency

        const proto = prototypes[vendor.protounit]
        const name = proto.DisplayNameID && await translateEn(proto.DisplayNameID) || vendor.protounit

        let location = vendorLocations[vendor.protounit]
        let blueprint: true | undefined

        if (!location) {
          throw new Error(`Vendor "${vendor.protounit}" does not have a mapped location`)
        }

        if (location.startsWith("Blueprint")) {
          location = vendorLocations.gn_cap_generalempirestore01
          blueprint = true
        }

        results.push({
          id: vendor.protounit,
          name,
          location,
          blueprint,
          level: sold.level && sold.level - 3 || undefined,
          rarity: undefined,
          currency: convertCurrency(price.type),
          price: price.quantity,
          rotation: undefined,
        })
      }
    }
  }

  const unique = uniqWith(results, (a, b) => {
    const aWithoutId = { ...a, id: null }
    const bWithoutId = { ...b, id: null }
    return isEqual(aWithoutId, bWithoutId)
  })
  unique.sort(compareVendors)

  return unique.length ? unique : undefined
}
