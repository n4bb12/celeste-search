import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core"

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
  materials: Materials = {}

  private destroyed = false

  constructor(
    private changeRef: ChangeDetectorRef,
    private db: DbService,
    private settings: SettingsService,
  ) { }

  ngOnInit() {
    this.level = this.item.levels[this.item.levels.length - 1]

    if (this.item.recipe) {
      this.db.shared.subscribe(db => {
        if (!this.destroyed) {
          this.materials = db.materials
          this.changeRef.detectChanges()
        }
      })
    }

    this.settings.controls.precision.valueChanges.subscribe(() => {
      if (!this.destroyed) {
        this.changeRef.detectChanges()
      }
    })
  }

  ngOnDestroy() {
    this.destroyed = true
  }

  setLevel(level: number) {
    if (!this.destroyed) {
      this.level = level
      this.changeRef.detectChanges()
    }
  }

}
