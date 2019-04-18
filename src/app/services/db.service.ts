import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

import { publishReplay, refCount } from "rxjs/operators"

import { DB } from "../interfaces"

@Injectable({
  providedIn: "root",
})
export class DbService {

  readonly shared = this.fetch<Pick<DB, "materials" | "replace">>("shared")
  readonly items = this.fetch<Pick<DB, "items">>("items")
  readonly advisors = this.fetch<Pick<DB, "advisors">>("advisors")
  readonly blueprints = this.fetch<Pick<DB, "blueprints">>("blueprints")
  readonly designs = this.fetch<Pick<DB, "designs">>("designs")
  readonly consumables = this.fetch<Pick<DB, "consumables">>("consumables")

  constructor(
    private http: HttpClient,
  ) { }

  private fetch<T>(name: string) {
    return this.http.get<T>(`/assets/db/${name}.json`).pipe(
      publishReplay(1),
      refCount(),
    )
  }

}
