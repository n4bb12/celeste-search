import { Injectable } from "@angular/core"

import { uniq } from "lodash"
import { BehaviorSubject, combineLatest } from "rxjs"
import { debounceTime, tap } from "rxjs/operators"

import { Entity } from "../interfaces"

import { DbService } from "./db.service"
import { StateService } from "./state.service"
import { TABS } from "./tabs"

const EMPTY = []

@Injectable({
  providedIn: "root",
})
export class SearchService {

  readonly results = new BehaviorSubject<Entity[]>(EMPTY)

  constructor(
    private db: DbService,
    private state: StateService,
  ) {
    this.state.tabChange.pipe(
      tap(() => this.results.next(EMPTY)),
    ).subscribe()

    this.state.changes.pipe(
      debounceTime(200),
      tap(value => this.performSearch(value.tab, value.search)),
    ).subscribe()
  }

  private performSearch(tab: number, search: string) {
    console.time("search")
    const id = TABS[tab].id

    if (!search.trim()) {
      this.results.next(EMPTY)
      console.timeEnd("search")
      return
    }

    combineLatest(this.db.shared, this.db[id]).subscribe(([shared, db]) => {
      const isOutdated = () => tab !== this.state.tab || search !== this.state.search

      if (isOutdated()) {
        console.timeEnd("search")
        return
      }

      const entries = db[id]

      if (search.trim() === "*") {
        this.results.next([...entries])
        console.timeEnd("search")
        return
      }

      const words = this.getWords(search)

      if (words.length === 0) {
        console.timeEnd("search")
        return
      }

      const results: any[] = []

      for (const entry of entries) {
        if (isOutdated()) {
          break
        }
        if (words.every(word => entry.search.includes(word))) {
          results.push(entry)
        }
      }

      this.results.next(results.length ? results : EMPTY)

      console.timeEnd("search")
    })
  }

  private getWords(input: string): string[] {
    const words = input
      .toLowerCase()
      .replace(/\s+/g, " ")
      .split(/\s+/)

    const withNumber = input
      .toLowerCase()
      .replace(/(\w+)\s+(\d+)/g, "$1$2")
      .split(/\s+/)

    return uniq([...words, ...withNumber]
      .map(w => w.trim())
      .filter(w => w !== ""))
  }

}
