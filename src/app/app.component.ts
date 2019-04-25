import { Component } from "@angular/core"
import { DomSanitizer } from "@angular/platform-browser"

import { SwService, TABS, UrlService } from "./services"
import { DbService } from "./services/db.service"
import { DocumenTitleService } from "./services/document-title.service"
import { StateService } from "./services/state.service"

const viewportSpacing = "5vmin"
const bodySpacing = `3 * ${viewportSpacing}`
const bodyNegativeMargin = "1rem"
const columnWidth = "30rem"

@Component({
  selector: "cis-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {

  headerMaxWidth = this.calculateHeaderWidth(2)

  constructor(
    private sanitizer: DomSanitizer,
    private sw: SwService, // inject to trigger execution
    private title: DocumenTitleService, // inject to trigger execution
    private url: UrlService, // inject to trigger execution
  ) { }

  private calculateHeaderWidth(maxColumns: number) {
    return this.sanitizer.bypassSecurityTrustStyle(
      `calc(${maxColumns} * ${columnWidth} - ${bodyNegativeMargin} + 2 * ${bodySpacing})`,
    ) as string
  }

}
