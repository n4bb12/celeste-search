import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from "@angular/core"

import { distinctUntilChanged, map, tap } from "rxjs/operators"

import { Blueprint, Item } from "../../interfaces"
import { DbService } from "../../services"

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

  marketplace = this.db.shared.pipe(
    map(shared => shared.marketplaceById[this.id]),
    map(offerings => offerings && offerings.sort((a, b) => a.ItemPrice - b.ItemPrice)),
    distinctUntilChanged(),
    tap(() => this.changeRef.detectChanges()),
    tap(marketplace => console.log({ marketplace, this: this })),
  )

  constructor(
    private changeRef: ChangeDetectorRef,
    private db: DbService,
  ) { }

}
