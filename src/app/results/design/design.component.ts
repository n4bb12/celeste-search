import { ChangeDetectionStrategy, Component, Input } from "@angular/core"

import { map } from "rxjs/operators"

import { Design } from "../../interfaces"
import { DbService } from "../../services"

@Component({
  selector: "cis-design",
  templateUrl: "./design.component.html",
  styleUrls: ["./design.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignComponent {

  @Input() design: Design

  materials = this.db.shared.pipe(
    map(shared => shared.materials),
  )

  constructor(
    private db: DbService,
  ) { }

}
