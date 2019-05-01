import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core"

import { distinctUntilChanged, map, tap } from "rxjs/operators"

import { Advisor, AdvisorRarity, RARITIES } from "../../interfaces"
import { DbService } from "../../services"
import { OfferingGroup } from "../marketplace/marketplace.component"

@Component({
  selector: "cis-advisor",
  templateUrl: "./advisor.component.html",
  styleUrls: ["./advisor.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvisorComponent implements OnInit {

  @Input() advisor: Advisor

  rarities: string[] = []
  rarity: AdvisorRarity & { id: string }

  marketplace = this.db.shared.pipe(
    map(shared => {
      return RARITIES.map(key => {
        const details = this.advisor.rarities[key]
        if (!details) {
          return
        }
        const offerings = shared.marketplaceById[details.id]
        if (!offerings) {
          return
        }
        const group: OfferingGroup = {
          offerings: offerings
            .map(o => ({ price: o.ItemPrice }))
            .sort((a, b) => a.price - b.price),
          rarity: this.rarities.length > 1 ? key : undefined,
        }
        return group
      }).filter(Boolean)
    }),
    distinctUntilChanged(),
    tap(() => this.changeRef.detectChanges()),
  )

  constructor(
    private changeRef: ChangeDetectorRef,
    private db: DbService,
  ) { }

  ngOnInit() {
    this.rarities = Object.keys(this.advisor.rarities)
    const rarity = this.rarities[this.rarities.length - 1]
    this.setRarity(rarity)
  }

  setRarity(rarity: string) {
    this.advisor = { ...this.advisor }
    this.rarity = { ...this.advisor.rarities[rarity], id: rarity }
    this.changeRef.detectChanges()
  }

}
