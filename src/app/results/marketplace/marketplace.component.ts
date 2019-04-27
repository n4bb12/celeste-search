import { ChangeDetectionStrategy, Component, Input } from "@angular/core"

import { MarketplaceItem } from "celeste-api-types"

@Component({
  selector: "cis-marketplace",
  templateUrl: "./marketplace.component.html",
  styleUrls: ["./marketplace.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketplaceComponent {

  @Input() market: MarketplaceItem[]

  getPriceRange() {
    const lowestInt = this.market[0].ItemPrice
    const highestInt = this.market[this.market.length - 1].ItemPrice

    return [lowestInt, highestInt]
  }

}
