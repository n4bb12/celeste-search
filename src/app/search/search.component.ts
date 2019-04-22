import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core"
import { FormControl } from "@angular/forms"

import { NgScrollbar } from "ngx-scrollbar"
import { distinctUntilChanged, map, sampleTime, tap } from "rxjs/operators"

import { StateService } from "../services"

@Component({
  selector: "cis-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, AfterViewInit {

  @Input() scrollbarRef: NgScrollbar
  @ViewChild("inputRef") inputRef: ElementRef

  readonly inputModel = new FormControl()

  input = ""
  isEmpty = this.inputModel.valueChanges.pipe(map(input => !input))

  constructor(
    private state: StateService,
  ) {
    this.state.searchChange.subscribe(search => {
      this.inputModel.setValue(search)
    })
  }

  ngOnInit() {
    this.inputModel.valueChanges.pipe(
      tap(() => this.scrollbarRef.scrollToTop()),
      sampleTime(200),
      distinctUntilChanged(),
      tap(input => this.state.search = input),
    ).subscribe()
  }

  ngAfterViewInit() {
    if (!this.input) {
      this.inputRef.nativeElement.focus()
    }
  }

  clear() {
    this.inputModel.setValue("")
    this.inputRef.nativeElement.focus()
  }

  keepInputFocused() {
    if (document.activeElement === this.inputRef.nativeElement) {
      return
    }

    const selection = window.getSelection()

    if (!selection || !selection.isCollapsed) {
      return
    }

    const y = this.scrollbarRef.scrollable.measureScrollOffset("top")
    this.inputRef.nativeElement.focus()
    this.scrollbarRef.scrollYTo(y)
  }

}
