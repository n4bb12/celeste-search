import { ChangeDetectionStrategy, Component, Input } from "@angular/core"

export interface Offering {
  price: number
}

export interface OfferingGroup {
  offerings: Offering[]
  rarity?: string
  level?: number
}

@Component({
  selector: "cis-marketplace",
  templateUrl: "./marketplace.component.html",
  styleUrls: ["./marketplace.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketplaceComponent {

  @Input() marketplace: OfferingGroup[]

}
