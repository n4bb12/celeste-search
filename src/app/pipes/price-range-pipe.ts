import { Pipe, PipeTransform } from "@angular/core"

import { Offering } from "../services"

import { PricePipe } from "./price-pipe"

@Pipe({
  name: "priceRange",
})
export class PriceRangePipe implements PipeTransform {

  constructor(
    private pricePipe: PricePipe,
  ) { }

  transform(offerings?: Offering[]): string {
    if (!offerings || !offerings.length) {
      return ""
    }

    const lowestInt = offerings[0].price
    const highestInt = offerings[offerings.length - 1].price

    const lowestStr = this.pricePipe.transform(lowestInt)
    const highestStr = this.pricePipe.transform(highestInt)

    if (lowestStr === highestStr) {
      return `${lowestStr}`
    }

    return `${lowestStr} – ${highestStr}`
  }

}
