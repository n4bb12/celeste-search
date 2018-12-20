import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core"

import { TABS } from "./tabs"

@Component({
  selector: "cis-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {

  @Input() activeTab = 0
  @Output() activeTabChange = new EventEmitter<number>()

  readonly tabs = [...TABS]

  setActiveTab(index: number) {
    this.activeTab = index
    this.activeTabChange.emit(index)
  }

}
