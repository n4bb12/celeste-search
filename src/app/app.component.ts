import { Component } from "@angular/core"
import { DomSanitizer } from "@angular/platform-browser"

import { SettingsService, TABS, UrlService } from "./services"
import { DbService } from "./services/db.service"
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
    private db: DbService,
    private sanitizer: DomSanitizer,
    private settings: SettingsService,
    private state: StateService,
    private url: UrlService, // inject to trigger execution
  ) {
    this.state.tabChange.subscribe(tab => {
      // prefetch tab data on tab change
      const id = TABS[tab].id
      this.db[id].subscribe()

      // prefetch remaining data on app stable
      requestAnimationFrame(() => {
        this.db.shared.subscribe()
        this.db.items.subscribe()
        this.db.advisors.subscribe()
        this.db.blueprints.subscribe()
        this.db.designs.subscribe()
        this.db.consumables.subscribe()
      })
    })
  }

  private calculateHeaderWidth(maxColumns: number) {
    return this.sanitizer.bypassSecurityTrustStyle(
      `calc(${maxColumns} * ${columnWidth} - ${bodyNegativeMargin} + 2 * ${bodySpacing})`,
    ) as string
  }

}
