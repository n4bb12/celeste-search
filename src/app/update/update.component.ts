import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from "@angular/core"
import { SwUpdate } from "@angular/service-worker"

const order = ["idle", "available", "activating", "activated"] // as const
type SwState = typeof order[number]

@Component({
  selector: "cis-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateComponent implements AfterViewInit {

  state: SwState = "idle"

  readonly text = {
    available: "Updating...",
    activating: "Almost done...",
    activated: "Done",
  }
  readonly icon = {
    available: "busy",
    activating: "busy",
    activated: "done",
  }

  /**
   * https://angular.io/guide/service-worker-communications
   */
  constructor(
    private changeRef: ChangeDetectorRef,
    private updates: SwUpdate,
  ) {
    updates.available.subscribe(event => {
      console.log(event)
      this.setState("available")
    })
    updates.activated.subscribe(event => {
      console.log(event)
      this.setState("activated")
    })
  }

  ngAfterViewInit() {
    // this.transition()
  }

  setState(state: SwState) {
    if (state === "activating") {
      this.updates.activateUpdate().then(() => window.location.reload())
    }
    this.state = state
    this.changeRef.detectChanges()
  }

  transition() {
    const current = order.indexOf(this.state)
    const next = (current + 1) % order.length

    this.setState(order[next])

    // setTimeout(() => this.transition(), 1000)
  }

}
