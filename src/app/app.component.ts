import { AfterViewInit, Component } from "@angular/core"

import { DbService } from "./services/db.service"

@Component({
  selector: "cis-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {

  readonly items = this.db.fetch()

  constructor(
    private db: DbService,
  ) { }

}
