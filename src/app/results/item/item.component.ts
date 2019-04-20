import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core"

import { Item, Materials } from "../../interfaces"
import { DbService } from "../../services"

@Component({
  selector: "cis-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit {

  @Input() item: Item

  level: number
  materials: Materials = {}

  constructor(
    private changeRef: ChangeDetectorRef,
    private db: DbService,
  ) { }

  ngOnInit() {
    this.level = this.item.levels[this.item.levels.length - 1]

    if (this.item.recipe) {
      this.db.shared.subscribe(db => {
        this.materials = db.materials
        this.changeRef.detectChanges()
      })
    }
  }

  setLevel(level: number) {
    this.level = level
    this.changeRef.detectChanges()
  }

}
