import { Injectable } from "@angular/core"

import { BehaviorSubject, combineLatest, Observable } from "rxjs"
import { debounceTime, distinctUntilChanged, skip } from "rxjs/operators"

import { Advisor, Blueprint, Consumable, Design, Item } from "../interfaces"

import { DbService } from "./db.service"
import { TABS, TabService } from "./tab.service"
import { UrlService } from "./url.service"

@Injectable({
  providedIn: "root",
})
export class SearchService {

  private subject = new BehaviorSubject<string>("")
  private currentTab: number

  readonly items = new BehaviorSubject<Item[]>([])
  readonly advisors = new BehaviorSubject<Advisor[]>([])
  readonly blueprints = new BehaviorSubject<Blueprint[]>([])
  readonly designs = new BehaviorSubject<Design[]>([])
  readonly consumables = new BehaviorSubject<Consumable[]>([])

  private subjects = [
    this.items,
    this.advisors,
    this.blueprints,
    this.designs,
    this.consumables,
  ]

  set query(value: string) {
    this.subject.next(value)
  }

  get query(): string {
    return this.subject.value
  }

  get changes(): Observable<string> {
    return this.subject.asObservable().pipe(
      skip(1),
      distinctUntilChanged(),
    )
  }

  constructor(
    private db: DbService,
    private tab: TabService,
    private url: UrlService,
  ) {
    this.currentTab = this.tab.current

    this.url.changes.subscribe(query => {
      this.search(query)
    })

    this.tab.changes.subscribe(() => {
      this.search(this.query)
    })

    this.changes.pipe(
      debounceTime(100),
    ).subscribe(query => {
      this.url.update(query)
      this.update(query)
    })
  }

  async search(query: string): Promise<void> {
    if (query === this.query && this.tab.current === this.currentTab) {
      return
    }
    this.query = query
  }

  private update(query: string) {
    const activeTab = this.tab.current
    const dbName = TABS[activeTab].db
    const subject = this.subjects[activeTab]

    if (!query) {
      subject.next([])
      return
    }

    combineLatest(this.db.shared, this.db[dbName]).subscribe(([shared, db]) => {
      const entries = db[dbName]

      if (query.trim() === "*") {
        subject.next(entries.slice(0, 50))
        return
      }

      const words = this.performReplacements(shared.replace, query)
        .split(/\s+/)
        .map(w => w.trim())
        .filter(w => w !== "")

      if (words.length > 0) {
        const results = []

        for (const entry of entries) {
          if (query !== this.query || results.length >= 50) {
            break
          }
          if (words.every(word => entry.search.includes(word))) {
            results.push(entry)
          }
        }

        console.log(results.length, "RESULTS")
        subject.next(results)
      }
    })
  }

  private performReplacements(replace: any, input: string): string {
    let result = input
      .toLowerCase()
      .replace(/\s+/g, " ")

    Object.keys(replace).forEach(string => {
      result = result.replace(string, replace[string])
    })

    return result
  }

}
