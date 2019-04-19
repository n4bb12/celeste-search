import { CanBeSold, findAndConvertVendors } from "./../shared/convert-vendors"

/**
 * Searches all vendors and collects the ones that sell the
 * specified item.
 */
export async function findAndConvertItemVendors(item: CanBeSold) {
  const vendors = await findAndConvertVendors(item)

  // sold by regular vendor
  if (vendors.length) {
    return
  }
}
