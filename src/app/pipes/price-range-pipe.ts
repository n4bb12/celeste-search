import { Pipe, PipeTransform } from "@angular/core"

import { MarketplaceItem } from "celeste-api-types"

import { PricePipe } from "./price-pipe"

@Pipe({
  name: "priceRange",
})
export class PriceRangePipe implements PipeTransform {

  constructor(
    private pricePipe: PricePipe,
  ) { }

  transform(marketplace?: MarketplaceItem[]): string {
    if (!marketplace || !marketplace.length) {
      return ""
    }

    const lowestInt = marketplace[0].ItemPrice
    const highestInt = marketplace[marketplace.length - 1].ItemPrice

    const abbr = this.pricePipe.abbreviate(highestInt)
    const lowestStr = this.pricePipe.convertPrice(lowestInt, abbr)
    const highestStr = this.pricePipe.convertPrice(highestInt, abbr)

    if (lowestStr === highestStr) {
      return `${lowestStr}`
    }

    return `${lowestStr} – ${highestStr}`
  }

}
