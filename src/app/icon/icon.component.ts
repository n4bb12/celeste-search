import { ChangeDetectionStrategy, Component, Input } from "@angular/core"

@Component({
  selector: "cis-icon",
  templateUrl: "./icon.component.html",
  styleUrls: ["./icon.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {

  @Input() icon:
    | "clear"
    | "up"
    | "menu"
    | "bug"
    | "hints"
    | "columns"
    | "precision"

}
