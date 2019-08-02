import { Injectable } from "@angular/core"

import { uniq } from "lodash"
import { BehaviorSubject, combineLatest, Observable } from "rxjs"
import { take, tap } from "rxjs/operators"

import { Entity } from "../interfaces"

import { DbService } from "./db.service"
import { MarketplaceService } from "./marketplace.service"
import { SettingsService } from "./settings.service"
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
    private marketplace: MarketplaceService,
    private state: StateService,
    private settings: SettingsService,
  ) {
    this.state.tabChange.pipe(
      tap(() => this.results.next(EMPTY)),
    ).subscribe()

    this.state.changes.pipe(
      tap(value => this.performSearch(value.tab, value.search)),
    ).subscribe()

    this.settings.defaultToEverything.valueChanges.pipe(
      tap(() => this.performSearch(this.state.tab, this.state.search)),
    ).subscribe()
  }

  private performSearch(tab: number, search: string) {
    const perfKey = `search "${search}"`
    console.time(perfKey)

    const id = TABS[tab].id

    const sub = combineLatest([
      this.db[id] as Observable<any>,
      this.marketplace.byId,
    ]).pipe(
      take(1),
    ).subscribe(([entries, marketplaceById]) => {
      const isStale = () => tab !== this.state.tab || search !== this.state.search

      if (isStale()) {
        console.timeEnd(perfKey)
        return
      }

      const normalized = search.toLowerCase().trim()
      const isEmpty = !normalized

      if (isEmpty && this.settings.defaultToEverything.value
        || ["*", "all", "everything", "anything"].includes(normalized)
      ) {
        this.results.next([...entries])
        console.timeEnd(perfKey)
        return
      }

      if (isEmpty) {
        this.results.next(EMPTY)
        console.timeEnd(perfKey)
        return
      }

      const words = this.getWords(normalized)

      if (words.length === 0) {
        console.timeEnd(perfKey)
        return
      }

      const results: any[] = []

      for (const entry of entries) {
        if (isStale()) {
          break
        }

        let searchDynamic = ""

        entry.marketplace.forEach(query => {
          const offerings = marketplaceById[query.id]
          if (offerings && offerings.length > 0) {
            searchDynamic += " global marketplace"
          }
        })

        const fullText = `${entry.search}${searchDynamic}`

        if (words.every(word => fullText.includes(word))) {
          results.push(entry)
        }
      }

      this.results.next(results.length ? results : EMPTY)

      console.timeEnd(perfKey)
    })
  }

  private getWords(input: string): string[] {
    input = this.simplify(input)

    const words = input.split(" ")

    const withNumber = (input + " ")
      .replace(/(\b.+?)\s+([0-9]+\s)/g, "$1$2")
      .trim()
      .split(/\s+/)

    return uniq([...words, ...withNumber]
      .map(w => w.trim())
      .filter(w => w !== ""))
  }

  simplify(text: string) {
    return (text || "")
      .replace(/["']/g, "")
      .replace(/\s+/, " ")
      .trim()
  }

}
