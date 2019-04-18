import { Injectable } from "@angular/core"

import { BehaviorSubject, ReplaySubject } from "rxjs"

import { Advisor, Blueprint, Consumable, Design, Item } from "../interfaces"

import { DbService } from "./db.service"
import { UrlService } from "./url.service"

@Injectable({
  providedIn: "root",
})
export class SearchService {

  readonly query = new ReplaySubject<string>(1)
  private currentQuery: string

  private itemsSubject = new BehaviorSubject<Item[]>([])
  private advisorsSubject = new BehaviorSubject<Advisor[]>([])
  private blueprintsSubject = new BehaviorSubject<Blueprint[]>([])
  private designsSubject = new BehaviorSubject<Design[]>([])
  private consumablesSubject = new BehaviorSubject<Consumable[]>([])

  readonly items = this.itemsSubject.asObservable()
  readonly advisors = this.advisorsSubject.asObservable()
  readonly blueprints = this.blueprintsSubject.asObservable()
  readonly designs = this.designsSubject.asObservable()
  readonly consumables = this.consumablesSubject.asObservable()

  constructor(
    private db: DbService,
    private url: UrlService,
  ) {
    this.db.fetch()

    this.url.changes.subscribe(query => {
      this.search(query)
    })

    this.query.subscribe(query => {
      this.url.update(query)
    })
  }

  async search(query: string): Promise<void> {
    if (query === this.currentQuery) {
      return
    }
    this.query.next(query)

    let items: Item[] = []
    let advisors: Advisor[] = []
    let blueprints: Blueprint[] = []
    let designs: Design[] = []
    let consumables: Consumable[] = []

    if (!query) {
      this.itemsSubject.next(items)
      this.advisorsSubject.next(advisors)
      this.blueprintsSubject.next(blueprints)
      this.designsSubject.next(designs)
      this.consumablesSubject.next(consumables)
      return
    }

    this.db.fetch().subscribe(db => {
      const words = this.performReplacements(db.replace, query)
        .split(/\s+/)
        .map(w => w.trim())
        .filter(w => w !== "")

      if (words.length > 0) {
        items = db.items.filter(item => {
          return words.every(word => item.search.includes(word))
        })
        advisors = db.advisors.filter(advisor => {
          return words.every(word => advisor.search.includes(word))
        })
        blueprints = db.blueprints.filter(blueprint => {
          return words.every(word => blueprint.search.includes(word))
        })
        designs = db.designs.filter(design => {
          return words.every(word => design.search.includes(word))
        })
        consumables = db.consumables.filter(consumable => {
          return words.every(word => consumable.search.includes(word))
        })
      }

      this.itemsSubject.next(items)
      this.advisorsSubject.next(advisors)
      this.blueprintsSubject.next(blueprints)
      this.designsSubject.next(designs)
      this.consumablesSubject.next(consumables)
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
