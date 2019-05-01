import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

import { combineLatest, from, Observable } from "rxjs"
import { map, publishReplay, refCount } from "rxjs/operators"

import { DB } from "../interfaces"

import { MarketplaceService } from "./marketplace.service"
import { TABS } from "./tabs"

@Injectable({
  providedIn: "root",
})
export class DbService {

  readonly shared = combineLatest(
    this.fetch<"materials">("shared"),
    this.marketplace.fetch(),
  ).pipe(
    map(([shared, marketplaceById]) => {
      return { ...shared, marketplaceById }
    }),
  )

  readonly items = this.fetch<"items">("items")
  readonly advisors = this.fetch<"advisors">("advisors")
  readonly blueprints = this.fetch<"blueprints">("blueprints")
  readonly designs = this.fetch<"designs">("designs")

  // readonly consumables = this.fetch<Pick<DB, "consumables">>("consumables")

  constructor(
    private http: HttpClient,
    private marketplace: MarketplaceService,
  ) { }

  private fetch<T extends keyof DB>(name: string): Observable<Pick<DB, T>> {
    return combineLatest(
      this.fetchData<T>(name),
      this.fetchSprite(name),
    ).pipe(
      map(([data]) => data as any),
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
