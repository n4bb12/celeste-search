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
import { distinctUntilChanged, filter, map, tap } from "rxjs/operators"

import { Blueprint, Materials } from "../../interfaces"
import { DbService } from "../../services"

@Component({
  selector: "cis-blueprint",
  templateUrl: "./blueprint.component.html",
  styleUrls: ["./blueprint.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlueprintComponent implements OnInit, OnDestroy {

  @Input() blueprint: Blueprint

  materials: Materials
  market: MarketplaceItem[]

  private subscriptions: Subscription[] = []

  constructor(
    private changeRef: ChangeDetectorRef,
    private db: DbService,
    private dbService: DbService,
  ) { }

  ngOnInit() {
    const materialsSub = this.dbService.shared.subscribe(db => {
      this.materials = db.materials
      this.changeRef.detectChanges()
    })

    const byPrice = (a: MarketplaceItem, b: MarketplaceItem) => {
      return a.ItemPrice / a.ItemCount - b.ItemPrice / b.ItemCount
    }

    const marketplaceSub = this.db.marketplace.pipe(
      map(market => market.data.filter(entry => entry.ItemID === this.blueprint.id)),
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
