import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core"

import { Advisor } from "../../interfaces"

@Component({
  selector: "cis-advisor",
  templateUrl: "./advisor.component.html",
  styleUrls: ["./advisor.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvisorComponent implements OnInit {

  @Input() advisor: Advisor

  rarity: string

  constructor(
    private changeRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    const rarities = Object.keys(this.advisor.rarities)
    this.rarity = rarities[rarities.length - 1]
  }

  setRarity(rarity: string) {
    this.rarity = rarity
    this.changeRef.detectChanges()
  }

}
