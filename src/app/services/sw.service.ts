import { ApplicationRef, Injectable } from "@angular/core"
import { SwUpdate } from "@angular/service-worker"

import { interval } from "rxjs"
import { concatMap, first, tap } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class SwService {

  constructor(
    appRef: ApplicationRef,
    sw: SwUpdate,
  ) {
    if (!sw.isEnabled) {
      return
    }

    appRef.isStable.pipe(
      first(isStable => !isStable),
      concatMap(() => interval(60 * 60 * 1000)),
      tap(() => sw.checkForUpdate()),
    )
  }

}
