import { Injectable } from "@angular/core"
import { Title } from "@angular/platform-browser"

import { debounceTime, tap } from "rxjs/operators"

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
        const words = [
          TABS[changes.tab].name,
          `"${changes.search}"`,
        ]
        this.title.setTitle(words.filter(Boolean).join(" | "))
      }),
    ).subscribe()
  }

}
