import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core"

import { Subscription } from "rxjs"

import { Item, Materials } from "../../interfaces"
import { DbService, SettingsService } from "../../services"

@Component({
  selector: "cis-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit, OnDestroy {

  @Input() item: Item

  level: number
  materials: Materials

  private subscriptions: Subscription[] = []

  constructor(
    private changeRef: ChangeDetectorRef,
    private db: DbService,
    private settings: SettingsService,
  ) { }

  ngOnInit() {
    this.level = this.item.levels[this.item.levels.length - 1]

    const materialsSub = this.db.shared.subscribe(db => {
      this.materials = db.materials
      this.changeRef.detectChanges()
    })

    const precisionSub = this.settings.precision.valueChanges.subscribe(() => {
      this.changeRef.detectChanges()
    })

    this.subscriptions.push(materialsSub, precisionSub)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  setLevel(level: number) {
    this.level = level
    this.changeRef.detectChanges()
  }

}
