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

import { Design, Materials } from "../../interfaces"
import { DbService } from "../../services"

@Component({
  selector: "cis-design",
  templateUrl: "./design.component.html",
  styleUrls: ["./design.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignComponent implements OnInit, OnDestroy {

  @Input() design: Design

  materials: Materials
  market: MarketplaceItem[]

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
      map(market => market.data.filter(entry => entry.ItemID === this.design.id)),
      distinctUntilChanged(isEqual),
      map(market => market.sort(byPrice)),
      tap(market => this.market = market),
      tap(() => this.changeRef.detectChanges()),
    ).subscribe()

    this.subscriptions.push(materialsSub, marketplaceSub)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

}
