import { HttpClient } from "@angular/common/http"
import { ApplicationRef, Injectable } from "@angular/core"

import { Marketplace } from "celeste-api-types"
import { forkJoin, from, interval, Observable } from "rxjs"
import {
  delayWhen,
  flatMap,
  map,
  publishReplay,
  refCount,
  startWith,
} from "rxjs/operators"

import { DB } from "../interfaces"

import { TABS } from "./tabs"

@Injectable({
  providedIn: "root",
})
export class DbService {

  readonly shared = this.fetch<Pick<DB, "materials">>("shared")
  readonly items = this.fetch<Pick<DB, "items">>("items")
  readonly advisors = this.fetch<Pick<DB, "advisors">>("advisors")
  readonly blueprints = this.fetch<Pick<DB, "blueprints">>("blueprints")
  readonly designs = this.fetch<Pick<DB, "designs">>("designs")
  readonly consumables = this.fetch<Pick<DB, "consumables">>("consumables")

  readonly marketplace = interval(1000 * 60).pipe(
    startWith(-1),
    delayWhen(() => this.appRef.isStable),
    flatMap(() => this.http.get<Marketplace>("https://api.projectceleste.com/marketplace")),
    publishReplay(1),
    refCount(),
  )

  constructor(
    private http: HttpClient,
    private appRef: ApplicationRef,
  ) { }

  private fetch<T>(name: string): Observable<T> {
    return forkJoin(
      this.fetchData(name),
      this.fetchSprite(name),
    ).pipe(
      map(([data]) => data as T),
      publishReplay(1),
      refCount(),
    )
  }

  private fetchData(name: string) {
    return this.http.get(`/assets/db/${name}.json`)
  }

  private fetchSprite(name: string) {
    if (TABS.some(tab => tab.id === name)) {
      return from(new Promise(resolve => {
        const sprite = new Image()
        sprite.onload = resolve
        sprite.src = `/assets/sprites/${name}.png`
      }))
    }
    return from([null])
  }

}
