import { ChangeDetectionStrategy, Component, Input } from "@angular/core"

import { IconComponent } from "../icon/icon.component"

@Component({
  selector: "cis-primary-button",
  templateUrl: "./primary-button.component.html",
  styleUrls: ["./primary-button.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryButtonComponent {

  @Input() icon: IconComponent["icon"]

}
