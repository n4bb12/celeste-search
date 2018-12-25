import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core"

import { Blueprint } from "../../interfaces"
import { DbService } from "../../services"

@Component({
  selector: "cis-blueprint",
  templateUrl: "./blueprint.component.html",
  styleUrls: ["./blueprint.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlueprintComponent implements OnInit {

  @Input() blueprint: Blueprint

  materials = {}

  constructor(
    private changeRef: ChangeDetectorRef,
    private dbService: DbService,
  ) { }

  ngOnInit() {
    this.dbService.fetch().subscribe(db => {
      this.materials = db.materials
      this.changeRef.detectChanges()
    })
  }

}
