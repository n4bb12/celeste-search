import { ChangeDetectionStrategy, Component, Input } from "@angular/core"

import { Vendor } from "../../interfaces"

@Component({
  selector: "cis-vendors",
  templateUrl: "./vendors.component.html",
  styleUrls: ["./vendors.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendorsComponent {

  @Input() vendors: Vendor[]
  @Input() levels: number[]

}
