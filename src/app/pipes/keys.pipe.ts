import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: "keys",
})
export class KeysPipe implements PipeTransform {

  transform(obj: any): string[] {
    if (obj && typeof obj === "object") {
      return Object.keys(obj)
    }
    return obj
  }

}
