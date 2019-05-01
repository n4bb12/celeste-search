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

import { DbService } from "../../services"

@Component({
  selector: "cis-marketplace",
  templateUrl: "./marketplace.component.html",
  styleUrls: ["./marketplace.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketplaceComponent implements OnInit, OnDestroy {

  @Input() id: string

  marketplace: MarketplaceItem[]

  private subscriptions: Subscription[] = []

  constructor(
    private changeRef: ChangeDetectorRef,
    private db: DbService,
  ) { }

  ngOnInit() {
    const byPriceAsc = (a: MarketplaceItem, b: MarketplaceItem) => {
      return a.ItemPrice / a.ItemCount - b.ItemPrice / b.ItemCount
    }

    const marketplaceSub = this.db.marketplace.pipe(
      map(market => market.data.filter(entry => entry.ItemID === this.id)),
      distinctUntilChanged(isEqual),
      map(market => market.sort(byPriceAsc)),
      tap(market => this.marketplace = market),
      tap(() => this.changeRef.detectChanges()),
    ).subscribe()

    this.subscriptions.push(marketplaceSub)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  getPriceRange() {
    const lowestInt = this.marketplace[0].ItemPrice
    const highestInt = this.marketplace[this.marketplace.length - 1].ItemPrice

    return [lowestInt, highestInt]
  }

}
