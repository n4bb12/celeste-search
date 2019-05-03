import { isEqual, uniqWith } from "lodash"

import { API } from "../download"
import { Vendor } from "../interfaces"
import { translateEn } from "../shared/convert-text"

import { convertCurrency } from "./convert-currency"
import { convertRarity } from "./convert-rarity"
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

  // unfortunately, casing is not always consistent
  Object.keys(prototypes).forEach(protoId => {
    prototypes[protoId.toLowerCase()] = prototypes[protoId]
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

      if (id === sold.id.toLowerCase()) {
        const c = item.cost
        const price =
          c.capitalresource ||
          c.gamecurrency

        const proto = prototypes[vendor.protounit.toLowerCase()]
        const name = proto.DisplayNameID && await translateEn(proto.DisplayNameID) || vendor.protounit
        const location = vendorLocations[vendor.protounit] || vendor.protounit
        const normalLocation = location.startsWith("Blueprint")
          ? vendorLocations.Gn_Cap_GeneralEmpireStore01
          : location
        const blueprint = location.startsWith("Blueprint") || undefined

        results.push({
          id: vendor.protounit,
          name,
          location: normalLocation,
          blueprint,
          level: sold.level && sold.level - 3 || undefined,
          rarity: convertRarity(sold.id),
          currency: convertCurrency(price.type),
          price: price.quantity,
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
