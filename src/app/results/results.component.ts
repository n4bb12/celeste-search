import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core"

import { SearchService, StateService } from "../services"
import { Item } from "./../interfaces/Item"

@Component({
  selector: "cis-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent implements OnInit {

  readonly activeTabChange = this.state.tabChange

  readonly items = this.search.items
  readonly advisors = this.search.advisors
  readonly blueprints = this.search.blueprints
  readonly designs = this.search.designs
  readonly consumables = this.search.consumables

  numColumns = 3
  maxColumns = 3

  constructor(
    private search: SearchService,
    private state: StateService,
  ) { }

  ngOnInit() {
    this.handleResize()
  }

  handleResize() {
    const optimalColumns = Math.floor(window.innerWidth / 30 / 15)
    this.numColumns = Math.max(1, Math.min(optimalColumns, this.maxColumns))
  }

  trackItem(index: number, item: Item) {
    return item.id
  }

}
