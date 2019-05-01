import { Pipe, PipeTransform } from "@angular/core"

import { Offering } from "../results/marketplace/marketplace.component"

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

    const abbr = this.pricePipe.abbreviate(highestInt)
    const lowestStr = this.pricePipe.convertPrice(lowestInt, abbr)
    const highestStr = this.pricePipe.convertPrice(highestInt, abbr)

    if (lowestStr === highestStr) {
      return `${lowestStr}`
    }

    return `${lowestStr} – ${highestStr}`
  }

}
