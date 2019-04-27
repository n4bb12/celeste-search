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

import { Advisor, AdvisorRarity } from "../../interfaces"
import { DbService } from "../../services"

@Component({
  selector: "cis-advisor",
  templateUrl: "./advisor.component.html",
  styleUrls: ["./advisor.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvisorComponent implements OnInit, OnDestroy {

  @Input() advisor: Advisor

  rarities: string[] = []
  rarity: AdvisorRarity & { id: string }
  market: MarketplaceItem[]

  private subscriptions: Subscription[] = []

  constructor(
    private changeRef: ChangeDetectorRef,
    private db: DbService,
  ) { }

  ngOnInit() {
    this.rarities = Object.keys(this.advisor.rarities)
    const r = this.rarities
    this.setRarity(r[r.length - 1])

    const byPrice = (a: MarketplaceItem, b: MarketplaceItem) => {
      return a.ItemPrice / a.ItemCount - b.ItemPrice / b.ItemCount
    }

    const marketplaceSub = this.db.marketplace.pipe(
      map(market => market.data.filter(entry => entry.ItemID === this.advisor.id)),
      distinctUntilChanged(isEqual),
      map(market => market.sort(byPrice)),
      tap(market => this.market = market),
      tap(() => this.changeRef.detectChanges()),
    ).subscribe()

    this.subscriptions.push(marketplaceSub)
  }

  setRarity(rarity: string) {
    this.advisor = { ...this.advisor }
    this.rarity = { ...this.advisor.rarities[rarity], id: rarity }
    this.changeRef.detectChanges()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

}
