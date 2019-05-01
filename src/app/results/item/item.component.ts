import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core"

import { Subscription } from "rxjs"
import { map } from "rxjs/operators"

import { Item } from "../../interfaces"
import { DbService, SettingsService } from "../../services"

@Component({
  selector: "cis-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit, OnDestroy {

  @Input() item: Item

  level?: number

  materials = this.db.shared.pipe(
    map(shared => shared.materials),
  )

  private subscriptions: Subscription[] = []

  constructor(
    private changeRef: ChangeDetectorRef,
    private db: DbService,
    private settings: SettingsService,
  ) { }

  ngOnInit() {
    this.level = this.item.levels[this.item.levels.length - 1]

    const precisionSub = this.settings.precision.valueChanges.subscribe(() => {
      this.changeRef.detectChanges()
    })

    this.subscriptions.push(precisionSub)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  setLevel(level: number) {
    this.level = level
    this.changeRef.detectChanges()
  }

}
