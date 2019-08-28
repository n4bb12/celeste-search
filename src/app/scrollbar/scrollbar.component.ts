import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
} from "@angular/core"

import { NgScrollbar } from "ngx-scrollbar"

@Component({
  selector: "cis-scrollbar",
  templateUrl: "./scrollbar.component.html",
  styleUrls: ["./scrollbar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollbarComponent implements AfterViewInit {

  @Input() theme: "light" | "dark" = "light"

  @Output() refChange = new EventEmitter<NgScrollbar>()

  @ViewChild(NgScrollbar, { static: true }) ref: NgScrollbar

  ngAfterViewInit() {
    this.refChange.emit(this.ref)
  }

}
