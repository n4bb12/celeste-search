import chalk from "chalk"

import { API } from "../download"
import { Entity, Vendor } from "../interfaces"
import { translateEn } from "../shared/convert-text"

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
          level: item.level,
          rarity: convertRarity(sold.id),
          currency: convertCurrency(price.type),
          price: price.quantity,
        })
      }
    }
  }

  result.sort(compareVendors)

  return result.length ? result : undefined
}

function convertRarity(id: string) {
  if (id.includes("_C")) {
    return "common"
  }
  if (id.includes("_U")) {
    return "uncommon"
  }
  if (id.includes("_R")) {
    return "rare"
  }
  if (id.includes("_E")) {
    return "epic"
  }
  if (id.includes("_L")) {
    return "legendary"
  }
  if (id.startsWith("Vanity")) {
    return
  }
  if (id.startsWith("Van_")) {
    return
  }
  if (id.startsWith("Create")) {
    return
  }
  if (id.startsWith("Craft")) {
    return
  }
  if (id.startsWith("Pantheon")) {
    return
  }
  if (id.includes("BasicStore")) {
    return
  }
  if (id.includes("Warehouse")) {
    return
  }
  console.log(chalk.yellow(`Can't determine rarity for ${id}`))
}

function convertCurrency(id: string): Vendor["currency"] {
  if (id === "cCapResCoin") {
    return "coin"
  }
  if (id.includes("cGameCurEmpirePoints")) {
    return "empire"
  }
  if (id.includes("cCapResFactionPoints4")) {
    return "sparta"
  }
  if (id.includes("cCapResFactionPoints1")) {
    return "halloween"
  }
  if (id.includes("cCapResFactionPoints2")) {
    return "winter"
  }
  throw new Error("Unknown currency: " + id)
}
