import {
  AfterViewInit,
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core"
import { FormControl } from "@angular/forms"

import { distinctUntilChanged, filter, sampleTime, tap } from "rxjs/operators"

@Component({
  selector: "cis-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements AfterViewInit {

  @Input() input = ""
  @Output() inputChange = new EventEmitter<string>()

  @ViewChild("inputEl") inputEl: ElementRef
  readonly formControl = new FormControl()
  readonly placeholder = "Find Items and Advisors..."

  constructor(
    private appRef: ApplicationRef,
  ) { }

  ngAfterViewInit() {
    if (!this.input) {
      this.inputEl.nativeElement.focus()
    }

    this.appRef.isStable.subscribe(isStable => {
      if (isStable) {
        this.formControl.valueChanges.pipe(
          sampleTime(200),
          filter(input => input !== undefined),
          distinctUntilChanged(),
          tap(input => this.inputChange.emit(input)),
        ).subscribe()
      }
    })
  }

  clear() {
    this.input = ""
    this.inputEl.nativeElement.focus()
  }

}
