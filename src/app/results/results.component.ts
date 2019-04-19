import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core"

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

  readonly items = this.search.items
  readonly advisors = this.search.advisors
  readonly blueprints = this.search.blueprints
  readonly designs = this.search.designs
  readonly consumables = this.search.consumables

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
