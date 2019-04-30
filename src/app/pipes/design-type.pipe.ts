import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: "designType",
})
export class DesignTypePipe implements PipeTransform {

  transform(type: string): string {
    switch (type) {
      case "trait":
        return "Equipment Recipe"
      case "material":
        return "Material Recipe"
      case "consumable":
        return "Consumable Recipe"
      default:
        console.error("Unknown design type:", type)
        return ""
    }
  }

}
