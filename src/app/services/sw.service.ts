import { ApplicationRef, Injectable } from "@angular/core"
import { SwUpdate } from "@angular/service-worker"

@Injectable({
  providedIn: "root",
})
export class SwService {

  constructor(
    app: ApplicationRef,
    sw: SwUpdate,
  ) {
    if (!sw.isEnabled) {
      return
    }
    app.isStable.subscribe(() => {
      setInterval(() => sw.checkForUpdate(), 5 * 60 * 1000)
    })
  }

}
