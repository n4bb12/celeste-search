import { ChangeDetectionStrategy, Component } from "@angular/core"

import { TABS } from "../services"
import { StateService } from "./../services/state.service"

@Component({
  selector: "cis-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {

  readonly tabs = [...TABS]
  readonly activeTabChange = this.state.tabChange

  constructor(
    private state: StateService,
  ) { }

  setActiveTab(index: number) {
    this.state.tab = index
  }

}
