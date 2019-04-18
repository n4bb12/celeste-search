import { Injectable } from "@angular/core"

import { BehaviorSubject, Observable } from "rxjs"

export const TABS = [
  { name: "Items", icon: "GreekTechSpearmanS_ua" },
  { name: "Advisors", icon: "HerbalRemedies2" },
  { name: "Blueprints", icon: "TechTower3_ua" },
  // { name: "Designs", icon: "Trading_Contract_2" },
  // { name: "Consumables", icon: "C06TechPharmacology_ua" },
]

@Injectable({
  providedIn: "root",
})
export class TabService {

  private subject = new BehaviorSubject(0)

  set activeTab(value: number) {
    this.subject.next(value)
  }

  get activeTab(): number {
    return this.subject.value
  }

  get activeTabChange(): Observable<number> {
    return this.subject.asObservable()
  }

}
