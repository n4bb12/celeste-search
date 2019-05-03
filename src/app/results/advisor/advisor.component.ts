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

  rarities: string[] = []
  rarity: AdvisorRarity & { id: string }

  constructor(
    private changeRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.rarities = Object.keys(this.advisor.rarities)
    const rarity = this.rarities[this.rarities.length - 1]
    this.setRarity(rarity)
  }

  setRarity(rarity: string) {
    this.advisor = { ...this.advisor }
    this.rarity = { ...this.advisor.rarities[rarity], id: rarity }
    this.changeRef.detectChanges()
  }

}
