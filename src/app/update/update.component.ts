import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from "@angular/core"
import { SwUpdate } from "@angular/service-worker"

import { moveInOutLeft } from "../animations"

const order = ["idle", "available", "activating"] // as const
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
    available: "Click to Reload",
    activating: "Reloading...",
    activated: "Done",
  }
  readonly icon = {
    idle: "done",
    available: "busy",
    activating: "busy",
  }

  /**
   * https://angular.io/guide/service-worker-communications
   */
  constructor(
    private changeRef: ChangeDetectorRef,
    private swUpdate: SwUpdate,
  ) {
    if (!swUpdate.isEnabled) {
      return
    }
    swUpdate.available.subscribe(() => this.setState("available"))
    swUpdate.activated.subscribe(() => this.setState("idle"))

    swUpdate.available.subscribe(console.log)
    swUpdate.activated.subscribe(console.log)
  }

  ngAfterViewInit() {
    this.transition()
  }

  setState(state: SwState) {
    if (state === "activating") {
      this.swUpdate.activateUpdate().then(() => window.location.reload())
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
