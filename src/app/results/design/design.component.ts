import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core"

import { Design } from "../../interfaces"
import { DbService } from "../../services"

@Component({
  selector: "cis-design",
  templateUrl: "./design.component.html",
  styleUrls: ["./design.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignComponent implements OnInit {

  @Input() design: Design

  materials = {}

  constructor(
    private changeRef: ChangeDetectorRef,
    private dbService: DbService,
  ) { }

  ngOnInit() {
    this.dbService.shared.subscribe(db => {
      this.materials = db.materials
      this.changeRef.detectChanges()
    })
  }

}
