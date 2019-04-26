import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from "@angular/core"

import { enterLeaveRight } from "../animations"

@Component({
  selector: "cis-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [enterLeaveRight],
})
export class SidebarComponent {

  isOpen = false
  tab = 0

  constructor(
    private changeRef: ChangeDetectorRef,
  ) { }

  open() {
    this.isOpen = true
    this.changeRef.detectChanges()
  }

  close() {
    this.isOpen = false
    this.changeRef.detectChanges()
  }

}
