import { Pipe, PipeTransform } from "@angular/core"

import { Vendor } from "../interfaces"

@Pipe({
  name: "currency",
})
export class CurrencyPipe implements PipeTransform {

  transform(currency: Vendor["currency"]): string {
    switch (currency) {
    case "coin":
      return "Coins"
    case "empire":
      return "Empire Points"
    case "sparta":
      return "Sparta Points"
    case "crete":
      return "Crete Points"
    case "halloween":
      return "Halloween Points"
    case "winter":
      return "Winter Points"
    default:
      console.error("Unknown currency:", currency)
      return ""
    }
  }

}
