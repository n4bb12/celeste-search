import {
  AfterViewInit,
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from "@angular/core"
import { FormControl } from "@angular/forms"

import { distinctUntilChanged, sampleTime, tap } from "rxjs/operators"

import { SearchService } from "../services"

@Component({
  selector: "cis-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements AfterViewInit {

  @ViewChild("inputEl") inputEl: ElementRef
  readonly inputModel = new FormControl()
  input = ""

  constructor(
    private appRef: ApplicationRef,
    private search: SearchService,
  ) { }

  ngAfterViewInit() {
    if (!this.input) {
      this.inputEl.nativeElement.focus()
    }

    this.appRef.isStable.subscribe(isStable => {
      if (isStable) {
        this.inputModel.valueChanges.pipe(
          sampleTime(200),
          distinctUntilChanged(),
          tap(input => this.search.search(input)),
        ).subscribe()
      }
    })
  }

  clear() {
    this.inputModel.setValue("")
    this.inputEl.nativeElement.focus()
  }

}
