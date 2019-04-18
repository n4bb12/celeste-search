import { ChangeDetectionStrategy, Component } from "@angular/core"

import { TABS, TabService } from "../services"

@Component({
  selector: "cis-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {

  readonly tabs = [...TABS]
  readonly activeTabChange = this.tabService.activeTabChange

  constructor(
    private tabService: TabService,
  ) { }

  setActiveTab(index: number) {
    this.tabService.activeTab = index
  }

}
