import { Injectable } from "@angular/core"

import { ReplaySubject } from "rxjs"

import { Advisor, Blueprint, Consumable, Design, Item } from "../interfaces"

import { DbService } from "./db.service"

@Injectable({
  providedIn: "root",
})
export class SearchService {

  private itemsSubject = new ReplaySubject<Item[]>(1)
  private advisorsSubject = new ReplaySubject<Advisor[]>(1)
  private blueprintsSubject = new ReplaySubject<Blueprint[]>(1)
  private designsSubject = new ReplaySubject<Design[]>(1)
  private consumablesSubject = new ReplaySubject<Consumable[]>(1)

  readonly items = this.itemsSubject.asObservable()
  readonly advisors = this.advisorsSubject.asObservable()
  readonly blueprints = this.blueprintsSubject.asObservable()
  readonly designs = this.designsSubject.asObservable()
  readonly consumables = this.consumablesSubject.asObservable()

  constructor(
    private db: DbService,
  ) {
    this.db.fetch()
    this.itemsSubject.next([])
    this.advisorsSubject.next([])
  }

  async search(query: string): Promise<void> {
    let items: Item[] = []
    let advisors: any[] = []
    let blueprints: any[] = []
    let designs: any[] = []
    let consumables: any[] = []

    if (!query) {
      this.itemsSubject.next(items)
      this.advisorsSubject.next(advisors)
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
          return words.every(word => true || advisor.search.includes(word))
        })
        blueprints = db.blueprints.filter(blueprint => {
          return words.every(word => true || blueprint.search.includes(word))
        })
        designs = db.designs.filter(design => {
          return words.every(word => true || design.search.includes(word))
        })
        consumables = db.consumables.filter(consumable => {
          return words.every(word => true || consumable.search.includes(word))
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
