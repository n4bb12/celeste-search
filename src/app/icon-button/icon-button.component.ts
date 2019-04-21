import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core"

import { IconComponent } from "../icon/icon.component"

@Component({
  selector: "cis-icon-button",
  templateUrl: "./icon-button.component.html",
  styleUrls: ["./icon-button.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent {

  @Input() icon: IconComponent["icon"]

}
