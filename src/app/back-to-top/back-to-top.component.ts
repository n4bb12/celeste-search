import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
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
export class BackToTopComponent implements OnInit {

  @Input() scrollbarRef: NgScrollbar
  shown: Observable<boolean>

  ngOnInit() {
    const scrollbar = this.scrollbarRef.scrollable

    this.shown = scrollbar.elementScrolled().pipe(
      map(() => scrollbar.measureScrollOffset("top") > 0),
    )
  }

  scrollToTop() {
    this.scrollbarRef.scrollToTop()
  }

}
