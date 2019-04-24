import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: "price",
})
export class PricePipe implements PipeTransform {

  transform(price: number): string {
    const abbr = this.abbreviate(price)

    return this.convertPrice(price, abbr)
  }

  abbreviate(price: number) {
    if (price >= 10000000) {
      return "M"
    }
    if (price >= 10000) {
      return "k"
    }
    return ""
  }

  convertPrice(price: number, abbreviation: "M" | "k" | "") {
    if (abbreviation === "M") {
      price = Math.round(price / 1000000)
    }
    if (abbreviation === "k") {
      price = Math.round(price / 1000)
    }
    return price + abbreviation
  }

}
