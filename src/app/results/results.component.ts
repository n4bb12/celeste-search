import { ChangeDetectionStrategy, Component, Input } from "@angular/core"

import { map } from "rxjs/operators"

import { SearchService } from "../services"

@Component({
  selector: "cis-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent {

  @Input() activeTab = 0

  readonly items = this.search.items.pipe(map(results => results.slice(0, 10)))
  readonly advisors = this.search.advisors.pipe(map(results => results.slice(0, 10)))

  constructor(
    private search: SearchService,
  ) { }

}
