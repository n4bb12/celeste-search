import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core"
import { FormControl } from "@angular/forms"

import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
} from "rxjs/operators"

import { SearchService } from "../services"

@Component({
  selector: "cis-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {

  @ViewChild("inputRef") inputRef: ElementRef
  readonly inputModel = new FormControl()
  input = "divine"

  constructor(
    private search: SearchService,
  ) {
    this.inputModel.setValue(this.input)
  }

  ngOnInit() {
    if (!this.input) {
      this.inputRef.nativeElement.focus()
    }

    this.inputModel.valueChanges.pipe(
      startWith(this.input),
      debounceTime(500),
      distinctUntilChanged(),
      tap(input => this.search.search(input)),
    ).subscribe()

  }

  clear() {
    this.inputModel.setValue("")
    this.inputRef.nativeElement.focus()
  }

}
