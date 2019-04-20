import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core"

import { Advisor, Blueprint, Consumable, Design, Item } from "../interfaces"
import { SearchService, StateService } from "../services"

import { hiddenRenderData } from "./hidden-render"

const rem = 15

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
  // readonly designs = this.search.designs
  // readonly consumables = this.search.consumables

  readonly hiddenRenderItem = hiddenRenderData.item
  readonly hiddenRenderAdvisor = hiddenRenderData.advisor
  readonly hiddenRenderBlueprint = hiddenRenderData.blueprint

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
    const optimalColumns = Math.floor(window.innerWidth / 30 / rem)
    this.numColumns = Math.max(1, Math.min(optimalColumns, this.maxColumns))
  }

  trackItem(index: number, entry: Item | Advisor | Blueprint | Design | Consumable) {
    return entry.name
  }

}
