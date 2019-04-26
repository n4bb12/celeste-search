import { ChangeDetectionStrategy, Component } from "@angular/core"

import { SettingsService } from "../services/settings.service"

@Component({
  selector: "cis-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {

  readonly precision = this.settings.controls.precision
  readonly maxColumns = this.settings.controls.maxColumns

  constructor(
    public settings: SettingsService,
  ) { }

}
