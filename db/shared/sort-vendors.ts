import { Vendor } from "../interfaces"

export function compareVendors(a: Vendor, b: Vendor) {
  return (b.level || 40) - (a.level || 40)
}
