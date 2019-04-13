import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core"

import { Advisor, AdvisorRarity } from "../../interfaces"

@Component({
  selector: "cis-advisor",
  templateUrl: "./advisor.component.html",
  styleUrls: ["./advisor.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvisorComponent implements OnInit {

  @Input() advisor: Advisor

  rarity: AdvisorRarity

  constructor(
    private changeRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    const rarities = Object.values(this.advisor.rarities)
    this.rarity = rarities[rarities.length - 1]
  }

  setRarity(rarity: string) {
    this.advisor = { ...this.advisor }
    this.rarity = { ...this.advisor.rarities[rarity] }
    this.changeRef.detectChanges()
  }

}
