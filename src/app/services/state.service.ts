import { Injectable } from "@angular/core"

import { BehaviorSubject, combineLatest, Observable } from "rxjs"
import { map, skip } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class StateService {

  private tabSubject = new BehaviorSubject<number>(-1)
  private searchSubject = new BehaviorSubject<string>("null")

  get tab(): number {
    return this.tabSubject.value
  }

  set tab(value: number) {
    if (value !== this.tab) {
      this.tabSubject.next(value)
    }
  }

  get search(): string {
    return this.searchSubject.value
  }

  set search(value: string) {
    if (value !== this.search) {
      this.searchSubject.next(value)
    }
  }

  get tabChange(): Observable<number> {
    return this.tabSubject.asObservable().pipe(
      skip(1),
    )
  }

  get searchChange(): Observable<string> {
    return this.searchSubject.asObservable().pipe(
      skip(1),
    )
  }

  get changes() {
    return combineLatest([
      this.tabChange,
      this.searchChange,
    ]).pipe(
      map(([tab, search]) => ({ tab, search })),
    )
  }

}
