import { Injectable } from "@angular/core"
import { Title } from "@angular/platform-browser"

import { tap } from "rxjs/operators"

import { StateService } from "./state.service"
import { TABS } from "./tabs"

@Injectable({
  providedIn: "root",
})
export class DocumenTitleService {

  constructor(
    private title: Title,
    private state: StateService,
  ) {
    this.state.changes.pipe(
      tap(changes => {
        const tab = TABS[changes.tab].name
        const search = changes.search
        const appName = "Celeste Search"

        const result = [search, tab, appName].filter(Boolean).join(" - ")

        this.title.setTitle(result)
      }),
    ).subscribe()
  }

}
