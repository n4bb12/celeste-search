import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from "@angular/core"

import { NgScrollbar } from "ngx-scrollbar"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"

@Component({
  selector: "cis-back-to-top",
  templateUrl: "./back-to-top.component.html",
  styleUrls: ["./back-to-top.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackToTopComponent implements OnChanges {

  @Input() scrollbar: NgScrollbar
  shown: Observable<boolean>

  ngOnChanges() {
    this.shown = this.scrollbar.scrolled.pipe(
      map(e => e.target.scrollTop > 0),
    )
  }

  scrollToTop() {
    this.scrollbar.scrollToTop()
  }

}
