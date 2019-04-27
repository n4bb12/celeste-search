import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core"

import { MarketplaceItem } from "celeste-api-types"
import { isEqual } from "lodash"
import { Subscription } from "rxjs"
import { distinctUntilChanged, map, tap } from "rxjs/operators"

import { Blueprint, Item, Materials } from "../../interfaces"
import { DbService } from "../../services"

@Component({
  selector: "cis-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent implements OnInit, OnDestroy {

  @Input() id: Item["id"]
  @Input() name: Item["name"]
  @Input() description: Blueprint["description"]
  @Input() type: Item["type"]
  @Input() rarity: Item["rarity"]
  @Input() icon: Item["icon"]
  @Input() sprite: "icons" | "advisors" | "blueprints" | "designs" | "consumables"
  @Input() vendors: Item["vendors"]

  materials: Materials
  marketplace: MarketplaceItem[]

  private subscriptions: Subscription[] = []

  constructor(
    private changeRef: ChangeDetectorRef,
    private db: DbService,
  ) { }

  ngOnInit() {
    const materialsSub = this.db.shared.subscribe(db => {
      this.materials = db.materials
      this.changeRef.detectChanges()
    })

    const byPrice = (a: MarketplaceItem, b: MarketplaceItem) => {
      return a.ItemPrice / a.ItemCount - b.ItemPrice / b.ItemCount
    }

    const marketplaceSub = this.db.marketplace.pipe(
      map(market => market.data.filter(entry => entry.ItemID === this.id)),
      distinctUntilChanged(isEqual),
      map(market => market.sort(byPrice)),
      tap(market => this.marketplace = market),
      tap(() => this.changeRef.detectChanges()),
    ).subscribe()

    this.subscriptions.push(materialsSub, marketplaceSub)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

}
