import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from "@angular/core"
import { SwUpdate } from "@angular/service-worker"

import { moveInOutLeft } from "../animations"

const order = ["idle", "available", "activating", "activated"] // as const
type SwState = typeof order[number]

@Component({
  selector: "cis-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [moveInOutLeft],
})
export class UpdateComponent implements AfterViewInit {

  state: SwState = "idle"

  readonly text = {
    idle: "",
    available: "Updating...",
    activating: "Click to Reload",
    activated: "Reloading...",
  }
  readonly icon = {
    idle: "done",
    available: "busy",
    activating: "done",
    activated: "done",
  }

  /**
   * https://angular.io/guide/service-worker-communications
   */
  constructor(
    private changeRef: ChangeDetectorRef,
    private sw: SwUpdate,
  ) {
    if (!sw.isEnabled) {
      return
    }
    sw.available.subscribe(event => {
      console.log(event)
      this.setState("available")
    })
    sw.activated.subscribe(event => {
      console.log(event)
      this.setState("activated")
    })
  }

  ngAfterViewInit() {
    this.transition()
  }

  setState(state: SwState) {
    if (state === "activating") {
      this.sw.activateUpdate().then(() => window.location.reload())
    }
    this.state = state
    this.changeRef.detectChanges()
  }

  transition() {
    const current = order.indexOf(this.state)
    const next = (current + 1) % order.length

    this.setState(order[next])
  }

}
