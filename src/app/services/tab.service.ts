import { Injectable } from "@angular/core"

import { BehaviorSubject, Observable } from "rxjs"

import { DbService } from "./db.service"

export const TABS = [
  { db: "items", name: "Items", icon: "GreekTechSpearmanS_ua" },
  { db: "advisors", name: "Advisors", icon: "HerbalRemedies2" },
  { db: "blueprints", name: "Blueprints", icon: "TechTower3_ua" },
  // { db: "designs", name: "Designs", icon: "Trading_Contract_2" },
  // { db: "consumables", name: "Consumables", icon: "C06TechPharmacology_ua" },
]

@Injectable({
  providedIn: "root",
})
export class TabService {

  private subject = new BehaviorSubject(0)

  constructor(
    private db: DbService,
  ) {
    // prefetch db
    this.subject.subscribe(tab => {
      const dbName = TABS[tab].db
      this.db[dbName].subscribe()
    })
  }

  set current(value: number) {
    this.subject.next(value)

  }

  get current(): number {
    return this.subject.value
  }

  get changes(): Observable<number> {
    return this.subject.asObservable()
  }

}
