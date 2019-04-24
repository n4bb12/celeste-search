import { Pipe, PipeTransform } from "@angular/core"

import { PricePipe } from "./price-pipe"

@Pipe({
  name: "priceRange",
})
export class PriceRangePipe implements PipeTransform {

  constructor(
    private pricePipe: PricePipe,
  ) { }

  transform(range: [number, number?]): string {
    const lowestInt = range[0]
    const highestInt = range[1] || lowestInt

    const abbr = this.pricePipe.abbreviate(highestInt)
    const lowestStr = this.pricePipe.convertPrice(lowestInt, abbr)
    const highestStr = this.pricePipe.convertPrice(highestInt, abbr)

    if (lowestStr === highestStr) {
      return `${lowestStr}`
    }

    return `${lowestStr} – ${highestStr}`
  }

}
