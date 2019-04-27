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

import { Item, Materials } from "../../interfaces"
import { DbService, SettingsService } from "../../services"

@Component({
  selector: "cis-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit, OnDestroy {

  @Input() item: Item

  level: number
  materials: Materials
  market: MarketplaceItem[]

  private subscriptions: Subscription[] = []

  constructor(
    private changeRef: ChangeDetectorRef,
    private db: DbService,
    private settings: SettingsService,
  ) { }

  ngOnInit() {
    this.level = this.item.levels[this.item.levels.length - 1]

    const materialsSub = this.db.shared.subscribe(db => {
      this.materials = db.materials
      this.changeRef.detectChanges()
    })

    const precisionSub = this.settings.precision.valueChanges.subscribe(() => {
      this.changeRef.detectChanges()
    })

    const byPrice = (a: MarketplaceItem, b: MarketplaceItem) => {
      return a.ItemPrice / a.ItemCount - b.ItemPrice / b.ItemCount
    }

    const marketplaceSub = this.db.marketplace.pipe(
      map(market => market.data.filter(entry => entry.ItemID === this.item.id)),
      distinctUntilChanged(isEqual),
      map(market => market.sort(byPrice)),
      tap(market => this.market = market),
      tap(() => this.changeRef.detectChanges()),
    ).subscribe()

    this.subscriptions.push(materialsSub, precisionSub, marketplaceSub)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  setLevel(level: number) {
    this.level = level
    this.changeRef.detectChanges()
  }

}
