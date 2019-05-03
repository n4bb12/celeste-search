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
      return (price / 1000 / 1000).toFixed(0) + abbreviation
    }
    if (abbreviation === "k") {
      if (price >= 20000) {
        return (price / 1000).toFixed(0) + abbreviation
      }
      return (price / 1000).toFixed(1) + abbreviation
    }
    return price + abbreviation
  }

}
