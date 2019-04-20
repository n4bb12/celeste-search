import { Component } from "@angular/core"

import { TABS, UrlService } from "./services"
import { DbService } from "./services/db.service"
import { StateService } from "./services/state.service"

@Component({
  selector: "cis-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {

  constructor(
    private db: DbService,
    private state: StateService,
    private url: UrlService, // inject to trigger execution
  ) {
    this.state.tabChange.subscribe(tab => {
      // prefetch tab data on tab change
      const dbName = TABS[tab].db
      this.db[dbName].subscribe()

      // prefetch remaining data on app stable
      this.db.shared.subscribe()
      this.db.items.subscribe()
      this.db.advisors.subscribe()
      this.db.blueprints.subscribe()
      this.db.designs.subscribe()
      this.db.consumables.subscribe()
    })
  }

}
