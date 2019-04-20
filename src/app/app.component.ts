import { Component } from "@angular/core"

import { UrlService } from "./services"

@Component({
  selector: "cis-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {

  constructor(
    // inject to trigger execution
    private url: UrlService,
    ) { }

}
