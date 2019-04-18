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
import { distinctUntilChanged, sampleTime, tap } from "rxjs/operators"

import { SearchService } from "../services"

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

  constructor(
    private search: SearchService,
  ) {
    this.search.query.subscribe(query => {
      this.inputModel.setValue(query)
    })
  }

  ngOnInit() {
    this.inputModel.valueChanges.pipe(
      sampleTime(200),
      distinctUntilChanged(),
      tap(input => this.search.search(input)),
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

    if (!window.getSelection().isCollapsed) {
      return
    }

    const y = this.scrollbarRef.scrollable.measureScrollOffset("top")
    this.inputRef.nativeElement.focus()
    this.scrollbarRef.scrollYTo(y)
  }

}
