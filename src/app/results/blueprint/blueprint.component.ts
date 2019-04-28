import { ChangeDetectionStrategy, Component, Input } from "@angular/core"

import { map } from "rxjs/operators"

import { Blueprint } from "../../interfaces"
import { DbService } from "../../services"

@Component({
  selector: "cis-blueprint",
  templateUrl: "./blueprint.component.html",
  styleUrls: ["./blueprint.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlueprintComponent {

  @Input() blueprint: Blueprint

  materials = this.db.shared.pipe(
    map(shared => shared.materials),
  )

  constructor(
    private db: DbService,
  ) { }

}
