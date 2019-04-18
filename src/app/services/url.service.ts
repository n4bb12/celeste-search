import { Injectable } from "@angular/core"
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router"

import { distinctUntilChanged, filter, flatMap, map, tap } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class UrlService {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  update(search: string) {
    const queryParams = search
      ? { search }
      : undefined

    this.router.navigate([], { queryParams })
  }

  get changes() {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      flatMap(() => this.activatedRoute.queryParamMap),
      map(paramMap => paramMap.get("search")),
      distinctUntilChanged(),
    )
  }

}
