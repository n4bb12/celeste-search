import { Component } from "@angular/core"
import { DomSanitizer } from "@angular/platform-browser"

import { SwService, UrlService } from "./services"
import { DocumenTitleService } from "./services/document-title.service"

const viewportSpacing = "6vmin"
const bodySpacing = `3 * ${viewportSpacing}`
const bodyNegativeMargin = "1rem"
const columnWidth = "30rem"

@Component({
  selector: "cis-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {

  headerWidth = this.calculateHeaderWidth(2)

  constructor(
    private sanitizer: DomSanitizer,
    private sw: SwService, // inject to trigger execution
    private title: DocumenTitleService, // inject to trigger execution
    private url: UrlService, // inject to trigger execution
  ) { }

  private calculateHeaderWidth(maxColumns: number) {
    const style = `calc(${maxColumns} * ${columnWidth} - ${bodyNegativeMargin} + 2 * ${bodySpacing})`
    return this.sanitizer.bypassSecurityTrustStyle(style) as string
  }

}
