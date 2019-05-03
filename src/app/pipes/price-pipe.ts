import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: "price",
})
export class PricePipe implements PipeTransform {

  transform(price: number): string {
    if (price >= 1000 * 1000) {
      return (price / 1000 / 1000).toFixed(1) +  "M"
    }
    if (price >= 1000) {
      return (price / 1000).toFixed(0) +  "k"
    }
    return price.toFixed(0)
  }

}
