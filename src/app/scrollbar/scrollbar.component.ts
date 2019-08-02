import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from "@angular/core"

import { NgScrollbar } from "ngx-scrollbar"

@Component({
  selector: "cis-scrollbar",
  templateUrl: "./scrollbar.component.html",
  styleUrls: ["./scrollbar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollbarComponent {

  @ViewChild(NgScrollbar, { static: true }) ref: NgScrollbar
  @Input() theme: "light" | "dark" = "light"

}
