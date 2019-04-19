import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core"

import { map } from "rxjs/operators"

import { SearchService, TabService } from "../services"
import { Item } from "./../interfaces/Item"

@Component({
  selector: "cis-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent implements OnInit {

  readonly activeTabChange = this.tabs.changes

  readonly items = this.search.items.pipe(map(results => results.slice(0, 50)))
  readonly advisors = this.search.advisors.pipe(map(results => results.slice(0, 50)))
  readonly blueprints = this.search.blueprints.pipe(map(results => results.slice(0, 50)))
  readonly designs = this.search.designs.pipe(map(results => results.slice(0, 50)))
  readonly consumables = this.search.consumables.pipe(map(results => results.slice(0, 50)))

  numColumns = 3

  constructor(
    private search: SearchService,
    private tabs: TabService,
  ) { }

  ngOnInit() {
    this.handleResize()
  }

  handleResize() {
    this.numColumns = Math.max(1, Math.floor(window.innerWidth / 30 / 15))
  }

  trackItem(index: number, item: Item) {
    return item.id
  }

}
