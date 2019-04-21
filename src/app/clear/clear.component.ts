import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from "@angular/core"

@Component({
  selector: "cis-clear",
  templateUrl: "./clear.component.html",
  styleUrls: ["./clear.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClearComponent {

  @Output() clear = new EventEmitter()

  handleClick() {
    this.clear.emit()
  }

}
