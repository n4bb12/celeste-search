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

  rarity: AdvisorRarity & { id: string }

  constructor(
    private changeRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    const rarities = Object.keys(this.advisor.rarities)
    const highest = rarities[rarities.length - 1]
    this.setRarity(highest)
  }

  setRarity(rarity: string) {
    this.advisor = { ...this.advisor }
    this.rarity = { ...this.advisor.rarities[rarity], id: rarity }
    this.changeRef.detectChanges()
  }

}
