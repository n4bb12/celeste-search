import { Injectable } from "@angular/core"

import { BehaviorSubject, combineLatest } from "rxjs"
import { debounceTime, tap } from "rxjs/operators"

import { Advisor, Blueprint, Consumable, Design, Item } from "../interfaces"

import { DbService } from "./db.service"
import { StateService } from "./state.service"
import { TABS } from "./tabs"

@Injectable({
  providedIn: "root",
})
export class SearchService {

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

  constructor(
    private db: DbService,
    private state: StateService,
  ) {
    this.state.changes.pipe(
      debounceTime(200),
      tap(value => this.update(value.tab, value.search)),
    ).subscribe()
  }

  private update(tab: number, search: string) {
    const dbName = TABS[tab].db
    const subject = this.subjects[tab]

    if (!search) {
      subject.next([])
      return
    }

    combineLatest(this.db.shared, this.db[dbName]).subscribe(([shared, db]) => {
      const entries = db[dbName]

      if (search.trim() === "*") {
        subject.next(entries.slice(0, 50))
        return
      }

      const words = this.performReplacements(shared.replace, search)
        .split(/\s+/)
        .map(w => w.trim())
        .filter(w => w !== "")

      if (words.length > 0) {
        const results = []

        for (const entry of entries) {
          if (tab !== this.state.tab || search !== this.state.search || results.length >= 50) {
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
