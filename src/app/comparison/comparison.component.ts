import { ChangeDetectionStrategy, Component, Input } from "@angular/core"

import { map } from "rxjs/operators"

import { SearchService } from "../services"
import { TABS } from "../tabs/tabs"

@Component({
  selector: "cis-comparison",
  templateUrl: "./comparison.component.html",
  styleUrls: ["./comparison.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonComponent {

  @Input() activeTab = 0

  readonly tabs = [...TABS]
  readonly items = this.search.items.pipe(map(results => results[0]))
  readonly advisors = this.search.advisors.pipe(map(results => results[0]))

  constructor(
    private search: SearchService,
  ) { }

}
