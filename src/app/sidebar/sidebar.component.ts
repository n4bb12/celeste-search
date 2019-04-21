import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from "@angular/core"

import { SettingsService } from "../services/settings.service"

@Component({
  selector: "cis-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {

  isOpen = false

  readonly precision = this.settings.controls.precision
  readonly maxColumns = this.settings.controls.maxColumns

  constructor(
    private changeRef: ChangeDetectorRef,
    public settings: SettingsService,
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
