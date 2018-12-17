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

  @ViewChild("inputEl") inputEl: ElementRef
  @Input() input = ""
  @Output() inputChange = new EventEmitter<string>()
  readonly inputModel = new FormControl()

  constructor(
    private appRef: ApplicationRef,
  ) { }

  ngAfterViewInit() {
    if (!this.input) {
      this.inputEl.nativeElement.focus()
    }

    this.appRef.isStable.subscribe(isStable => {
      if (isStable) {
        this.inputModel.valueChanges.pipe(
          distinctUntilChanged(),
          tap(input => this.inputChange.emit(input)),
        ).subscribe()
      }
    })
  }

  clear() {
    this.inputModel.setValue("")
    this.inputEl.nativeElement.focus()
  }

}
