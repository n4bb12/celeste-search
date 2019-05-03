import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

import { combineLatest, from, Observable } from "rxjs"
import { map, publishReplay, refCount } from "rxjs/operators"

import { Advisor, Blueprint, Design, Item, Materials } from "../interfaces"

import { MarketplaceById, MarketplaceService } from "./marketplace.service"
import { TABS } from "./tabs"

export interface Shared {
  materials: Materials
  marketplaceById: MarketplaceById
}

@Injectable({
  providedIn: "root",
})
export class DbService {

  readonly shared: Observable<Shared> = combineLatest(
    this.fetch("shared"),
    this.marketplace.observable,
  ).pipe(
    map(([shared, marketplaceById]) => {
      return { ...shared, marketplaceById }
    }),
  )

  readonly items = this.fetch<Item[]>("items")
  readonly advisors = this.fetch<Advisor[]>("advisors")
  readonly blueprints = this.fetch<Blueprint[]>("blueprints")
  readonly designs = this.fetch<Design[]>("designs")

  // readonly consumables = this.fetch<Consumable[]>("consumables")

  constructor(
    private http: HttpClient,
    private marketplace: MarketplaceService,
  ) { }

  private fetch<T = any>(name: string): Observable<T> {
    // prefetch corresponding sprite
    this.fetchSprite(name).subscribe()

    // merge latest marketplace data
    return combineLatest(
      this.fetchData<T>(name),
      this.marketplace.observable,
    ).pipe(
      map(([data, marketplace]) => {
        return data
      }),
      publishReplay(1),
      refCount(),
    )
  }

  private fetchData<T>(name: string) {
    return this.http.get<T>(`/assets/db/${name}.json`)
  }

  private fetchSprite(name: string): Observable<any> {
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
