import { HttpClient } from "@angular/common/http"
import { ApplicationRef, Injectable } from "@angular/core"

import { Marketplace } from "celeste-api-types"
import { forkJoin, from, interval, Observable, of } from "rxjs"
import {
  catchError,
  concatMap,
  first,
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
  // readonly designs = this.fetch<Pick<DB, "designs">>("designs")
  // readonly consumables = this.fetch<Pick<DB, "consumables">>("consumables")

  readonly marketplace = this.appRef.isStable.pipe(
    first(isStable => !!isStable),
    concatMap(() => interval(1000 * 60)),
    startWith(-1),
    flatMap(() => this.http.get<Marketplace>("https://api.projectceleste.com/marketplace")),
    catchError(error => of({ timestamp: new Date().toString(), data: [] } as Marketplace)),
    publishReplay(1),
    refCount(),
  )

  constructor(
    private http: HttpClient,
    private appRef: ApplicationRef,
  ) { }

  private fetch<T>(name: string): Observable<T> {
    return forkJoin(
      this.fetchData<T>(name),
      this.fetchSprite(name),
    ).pipe(
      map(([data]) => data as T),
      publishReplay(1),
      refCount(),
    )
  }

  private fetchData<T>(name: string) {
    return this.http.get<T>(`/assets/db/${name}.json`)
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
