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
  tap,
} from "rxjs/operators"

export interface MarketplaceById {
  [id: string]: MarketplaceItem[] | undefined
}

@Injectable({
  providedIn: "root",
})
export class MarketplaceService {

  private indexMarketplaceById = (marketplace: Marketplace) => {
    return Object.values(marketplace.data)
      .reduce((result, current) => {
        const id = current.ItemID.toLowerCase()
        result[id] = result[id] || []
        result[id].push(current)
        return result
      }, {})
  }

  fetch(): Observable<MarketplaceById> {
    return this.appRef.isStable.pipe(
      first(isStable => !!isStable),
      concatMap(() => interval(1000 * 60)),
      startWith(-1),
      flatMap(() => this.http.get<Marketplace>("https://api.projectceleste.com/marketplace")),
      map(this.indexMarketplaceById),
      catchError(error => of({})),
      publishReplay(1),
      refCount(),
    )
  }

  constructor(
    private http: HttpClient,
    private appRef: ApplicationRef,
  ) { }

}
