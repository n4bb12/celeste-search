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
  readonly activeTabChange = this.tab.changes

  constructor(
    private tab: TabService,
  ) { }

  setActiveTab(index: number) {
    this.tab.current = index
  }

}
