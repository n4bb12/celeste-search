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
    // prefetch data on tab change
    this.state.tabChange.subscribe(tab => {
      this.db.shared.subscribe()

      const dbName = TABS[tab].db
      this.db[dbName].subscribe()
    })
  }

}
