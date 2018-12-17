import { ChangeDetectionStrategy, Component } from "@angular/core"

import { ReplaySubject } from "rxjs"

@Component({
  selector: "cis-back-to-top",
  templateUrl: "./back-to-top.component.html",
  styleUrls: ["./back-to-top.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackToTopComponent {

  readonly atTop = new ReplaySubject<boolean>()

  constructor() {
    this.update()
  }

  scrollToTop() {
    document.body.scrollTop = 0
    this.update()
  }

  update() {
    this.atTop.next(document.body.scrollTop === 0)
  }

}
