import { ChangeDetectionStrategy, Component } from "@angular/core"

@Component({
  selector: "cis-legal",
  templateUrl: "./legal.component.html",
  styleUrls: ["./legal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegalComponent { }
