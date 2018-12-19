import { Injectable } from "@angular/core"

import { ReplaySubject } from "rxjs"

import { Item } from "../interfaces"

import { DbService } from "./db.service"

@Injectable({
  providedIn: "root",
})
export class SearchService {

  private itemsSubject = new ReplaySubject<Item[]>(1)
  private advisorsSubject = new ReplaySubject<Item[]>(1)

  readonly items = this.itemsSubject.asObservable()
  readonly advisors = this.advisorsSubject.asObservable()

  constructor(
    private db: DbService,
  ) {
    this.db.fetch()
    this.itemsSubject.next([])
    this.advisorsSubject.next([])
  }

  async search(query: string): Promise<void> {
    let items: Item[] = []
    let advisors: Item[] = []

    if (!query) {
      this.itemsSubject.next(items)
      this.advisorsSubject.next(advisors)
      return
    }

    this.db.fetch().subscribe(db => {
      const words = this.performReplacements(db.replace, query)
        .split("/\s+/")
        .map(w => w.trim())
        .filter(w => w !== "")

      if (words.length > 0) {
        items = db.items.filter(item => {
          return words.every(word => item.search.indexOf(word) >= 0)
        })
        advisors = db.advisors.filter(item => {
          return words.every(word => item.search.indexOf(word) >= 0)
        })
      }

      this.itemsSubject.next(items)
      this.advisorsSubject.next(advisors)
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
