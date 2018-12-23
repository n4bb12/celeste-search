import { ChangeDetectionStrategy, Component, Input } from "@angular/core"

import { map } from "rxjs/operators"

import { SearchService } from "../services"
import { Item } from "./../interfaces/Item"

@Component({
  selector: "cis-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent {

  @Input() activeTab = 0

  readonly items = this.search.items.pipe(map(results => results.slice(0, 20)))
  readonly advisors = this.search.advisors.pipe(map(results => results.slice(0, 20)))
  readonly blueprints = this.search.blueprints.pipe(map(results => results.slice(0, 20)))
  readonly designs = this.search.designs.pipe(map(results => results.slice(0, 20)))
  readonly consumables = this.search.consumables.pipe(map(results => results.slice(0, 20)))

  numColumns = 3

  constructor(
    private search: SearchService,
  ) { }

  trackItem(index: number, item: Item) {
    return item.id
  }

}
