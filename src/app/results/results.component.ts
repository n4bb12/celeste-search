import { ChangeDetectionStrategy, Component } from "@angular/core"

import { map } from "rxjs/operators"

import { SearchService } from "../services"

@Component({
  selector: "cis-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent {

  readonly items = this.search.items.pipe(map(results => results[0]))
  readonly advisors = this.search.advisors.pipe(map(results => results[0]))

  activeTab = 0

  constructor(
    private search: SearchService,
  ) { }

}
