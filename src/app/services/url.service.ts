import { Injectable } from "@angular/core"
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router"

import { debounceTime, filter, tap } from "rxjs/operators"

import { StateService } from "./state.service"

@Injectable({
  providedIn: "root",
})
export class UrlService {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private state: StateService,
  ) {
    // update url when state changes
    this.state.changes.pipe(
      debounceTime(200),
      tap(value => {
        const queryParams = this.querify(value)
        this.router.navigate([], { queryParams })
      }),
    ).subscribe()

    // update state when url changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(() => {
        state.tab = this.currentTab()
        state.search = this.currentSearch()
      }),
    ).subscribe()
  }

  private querify(value) {
    return Object.keys(value).reduce((result, key) => {
      result[key] = `${value[key]}`.replace(/\s+/g, "__")
      return result
    }, {})
  }

  private currentTab() {
    const params = this.activatedRoute.snapshot.queryParams
    const tab = +(params.tab || params.t)

    return Number.isNaN(tab) ? 0 : tab
  }

  private currentSearch() {
    const params = this.activatedRoute.snapshot.queryParams
    const search = params.search || params.s || params.query || params.q || ""

    return search.replace(/(?:__)+/g, " ")
  }

}
