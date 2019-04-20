import { Injectable } from "@angular/core"

import { BehaviorSubject, combineLatest } from "rxjs"
import { debounceTime, tap } from "rxjs/operators"

import { Advisor, Blueprint, Consumable, Design, Item } from "../interfaces"

import { DbService } from "./db.service"
import { StateService } from "./state.service"
import { TABS } from "./tabs"

const EMPTY = []

@Injectable({
  providedIn: "root",
})
export class SearchService {

  readonly items = new BehaviorSubject<Item[]>(EMPTY)
  readonly advisors = new BehaviorSubject<Advisor[]>(EMPTY)
  readonly blueprints = new BehaviorSubject<Blueprint[]>(EMPTY)
  readonly designs = new BehaviorSubject<Design[]>(EMPTY)
  readonly consumables = new BehaviorSubject<Consumable[]>(EMPTY)

  private readonly subjects = [
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
    console.time("search")
    const id = TABS[tab].id
    const subject = this.subjects[tab]

    if (!search) {
      subject.next(EMPTY)
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
        subject.next([...entries])
        console.timeEnd("search")
        return
      }

      const words = this.performReplacements(shared.replace, search)
        .split(/\s+/)
        .map(w => w.trim())
        .filter(w => w !== "")

      if (words.length === 0) {
        console.timeEnd("search")
        return
      }

      const results = []

      for (const entry of entries) {
        if (isOutdated()) {
          break
        }
        if (words.every(word => entry.search.includes(word))) {
          results.push(entry)
        }
      }

      subject.next(results.length ? results : EMPTY)

      console.timeEnd("search")
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
