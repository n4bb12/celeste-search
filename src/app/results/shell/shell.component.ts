import { ChangeDetectionStrategy, Component, Input } from "@angular/core"

import { Blueprint, Item } from "../../interfaces"

@Component({
  selector: "cis-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {

  @Input() id: Item["id"]
  @Input() name: Item["name"]
  @Input() description: Blueprint["description"]
  @Input() type: Item["type"]
  @Input() rarity: Item["rarity"]
  @Input() icon: Item["icon"]
  @Input() sprite: "icons" | "advisors" | "blueprints" | "designs" | "consumables"
  @Input() vendors: Item["vendors"]
  @Input() levels?: number[]
  @Input() rarities?: string[]

}
