import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

import { Observable } from "rxjs"
import { publishReplay, refCount } from "rxjs/operators"

import { DB } from "../interfaces"

@Injectable({
  providedIn: "root",
})
export class DbService {

  private dbObservable = this.http.get<DB>("/assets/db.json").pipe(
    publishReplay(1),
    refCount(),
  )

  constructor(
    private http: HttpClient,
  ) { }

  fetch(): Observable<DB> {
    return this.dbObservable
  }

}
