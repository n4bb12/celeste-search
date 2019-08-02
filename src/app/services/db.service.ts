import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

import { combineLatest, Observable } from "rxjs"
import { map, publishReplay, refCount } from "rxjs/operators"

import {
  Advisor,
  Blueprint,
  Consumable,
  Design,
  Item,
  Materials,
} from "../interfaces"

import { MarketplaceById, MarketplaceService } from "./marketplace.service"

export interface Shared {
  materials: Materials
  marketplaceById?: MarketplaceById
}

@Injectable({
  providedIn: "root",
})
export class DbService {

  readonly shared: Observable<Shared> = combineLatest([
    this.fetch<{ materials: Materials }>("shared"),
    this.marketplace.byId,
  ]).pipe(
    map(([shared, marketplaceById]) => {
      return { ...shared, marketplaceById }
    }),
  )

  readonly items = this.fetch<Item[]>("items")
  readonly advisors = this.fetch<Advisor[]>("advisors")
  readonly blueprints = this.fetch<Blueprint[]>("blueprints")
  readonly designs = this.fetch<Design[]>("designs")
  readonly consumables = this.fetch<Consumable[]>("consumables")

  constructor(
    private http: HttpClient,
    private marketplace: MarketplaceService,
  ) { }

  private fetch<T>(name: string) {
    return this.http.get<T>(`/assets/db/${name}.json`).pipe(
      publishReplay(1),
      refCount(),
    )
  }

}
