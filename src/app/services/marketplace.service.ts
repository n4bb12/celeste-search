import { HttpClient } from "@angular/common/http"
import { ApplicationRef, Injectable } from "@angular/core"

import { Marketplace, MarketplaceItem } from "celeste-api-types"
import { interval, Observable, of } from "rxjs"
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

import { MarketplaceQuery, RARITIES } from "../interfaces"

export interface MarketplaceById {
  [id: string]: MarketplaceItem[] | undefined
}

export interface Offering {
  price: number
}

export interface OfferingGroup {
  offerings: Offering[]
  rarity?: string
  level?: number
}

export interface MarketplaceGroupsById {
  [id: string]: OfferingGroup[]
}

@Injectable({
  providedIn: "root",
})
export class MarketplaceService {

  // readonly observable = this.appRef.isStable.pipe(
  //   first(isStable => !!isStable),
  //   concatMap(() => interval(1000 * 60)),
  //   startWith(-1),
  //   flatMap(() => this.http.get<Marketplace>("https://celeste-api.netlify.com/marketplace")),
  //   map(res => {
  //     // Don't show data that is older than a day
  //     if (new Date().getTime() - new Date(res.timestamp).getTime() > 1 * 24 * 60 * 60 * 1000) {
  //       res.data = []
  //     }
  //     return res
  //   }),
  //   catchError(error => of({
  //     timestamp: new Date().toISOString(),
  //     data: [],
  //   } as Marketplace)),
  //   publishReplay(1),
  //   refCount(),
  // )

  readonly observable = of({
    timestamp: new Date().toISOString(),
    data: [],
  } as Marketplace)

  readonly byId = this.observable.pipe(
    map(marketplace => Object.values(marketplace.data)
      .reduce((result, current) => {
        const id = current.ItemID.toLowerCase()
        result[id] = result[id] || []
        result[id]!.push(current)
        return result
      }, {} as MarketplaceById)),
  )

  groupByQuery(marketplaceById: MarketplaceById, queries: MarketplaceQuery[]) {
    const groups: OfferingGroup[] = []

    queries.forEach(q => {
      const offerings = (marketplaceById[q.id] || [])
        .filter(o => !q.level || q.level === o.ItemLevel - 3)
        .map(o => ({ price: o.ItemPrice }))
        .sort((a, b) => a.price - b.price)

      if (offerings.length) {
        groups.push({
          offerings,
          level: q.level,
          rarity: q.rarity,
        })
      }
    })

    return groups
      .sort((a, b) => RARITIES.indexOf(a.rarity || "") - RARITIES.indexOf(b.rarity || ""))
      .sort((a, b) => (b.level || 0) - (a.level || 0))
  }

  queryOfferings(queries: MarketplaceQuery[]): Observable<OfferingGroup[]> {
    return this.byId.pipe(
      map(marketplaceById => this.groupByQuery(marketplaceById, queries)),
      publishReplay(1),
      refCount(),
    )
  }

  constructor(
    private http: HttpClient,
    private appRef: ApplicationRef,
  ) { }

}
