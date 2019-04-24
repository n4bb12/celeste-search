import { Vendor } from "../interfaces"

export function convertCurrency(id: string): Vendor["currency"] {
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
