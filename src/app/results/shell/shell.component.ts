import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core"

import { Observable } from "rxjs"
import { distinctUntilChanged, map, tap } from "rxjs/operators"

import { Blueprint, Item } from "../../interfaces"
import { DbService } from "../../services"
import { OfferingGroup } from "../marketplace/marketplace.component"

@Component({
  selector: "cis-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent implements OnInit {

  @Input() id: Item["id"]
  @Input() name: Item["name"]
  @Input() description: Blueprint["description"]
  @Input() type: Item["type"]
  @Input() rarity: Item["rarity"]
  @Input() icon: Item["icon"]
  @Input() sprite: "icons" | "advisors" | "blueprints" | "designs" | "consumables"
  @Input() vendors: Item["vendors"]
  @Input() level?: number
  @Input() levels?: number[]
  @Input() rarities?: string[]
  @Input() marketplace?: Observable<OfferingGroup[]>

  constructor(
    private changeRef: ChangeDetectorRef,
    private db: DbService,
  ) { }

  ngOnInit() {
    if (!this.marketplace) {
      this.marketplace = this.db.shared.pipe(
        map(shared => {
          const levels = this.levels || [-1]
          return levels.map(level => {
            const offerings = shared.marketplaceById[this.id]
            if (!offerings) {
              return
            }
            const group: OfferingGroup = {
              offerings: offerings
                .filter(o => level < 0 || o.ItemLevel === level + 3)
                .map(o => ({ price: o.ItemPrice }))
                .sort((a, b) => a.price - b.price),
              level: levels.length > 1 ? level : undefined,
            }
            if (!group.offerings.length) {
              return
            }
            return group
          }).filter(Boolean) as any
        }),
        distinctUntilChanged(),
        tap(() => this.changeRef.detectChanges()),
      )
    }
  }

}
