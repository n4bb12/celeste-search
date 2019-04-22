import { ChangeDetectionStrategy, Component, Input } from "@angular/core"

import { Consumable } from "../../interfaces"

@Component({
  selector: "cis-consumable",
  templateUrl: "./consumable.component.html",
  styleUrls: ["./consumable.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsumableComponent {

  @Input() consumable: Consumable

}
