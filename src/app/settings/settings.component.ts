import { ChangeDetectionStrategy, Component } from "@angular/core"

import { SettingsService } from "../services"

@Component({
  selector: "cis-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {

  readonly precision = this.settings.precision
  readonly maxColumns = this.settings.maxColumns
  readonly defaultToEverything = this.settings.defaultToEverything

  constructor(
    private settings: SettingsService,
  ) { }

}
