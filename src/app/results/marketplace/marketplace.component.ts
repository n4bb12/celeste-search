import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from "@angular/core"

import { Observable, of } from "rxjs"

import { MarketplaceQuery } from "../../interfaces"
import { MarketplaceService, OfferingGroup } from "../../services"

@Component({
  selector: "cis-marketplace",
  templateUrl: "./marketplace.component.html",
  styleUrls: ["./marketplace.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketplaceComponent implements OnChanges {

  @Input() queries: MarketplaceQuery[]

  groups: Observable<OfferingGroup[]> = of([])

  constructor(
    private service: MarketplaceService,
  ) { }

  ngOnChanges() {
    if (this.queries && this.queries.length) {
      this.groups = this.service.queryOfferings(this.queries)
    } else {
      this.groups = of([])
    }
  }

}
