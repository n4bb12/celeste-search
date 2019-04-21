import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core"

import { distinctUntilChanged, tap } from "rxjs/operators"

import { Entity } from "../../../db/interfaces"
import { SearchService, StateService, TABS } from "../services"

import { hiddenRenderData } from "./hidden-render"

const rem = 15
const chunkSize = 12
const empty = []

@Component({
  selector: "cis-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent implements OnInit, OnDestroy {

  @ViewChild("sentinal") sentinel: ElementRef

  readonly activeTabChange = this.state.tabChange

  readonly hiddenRenderItem = hiddenRenderData.item
  readonly hiddenRenderAdvisor = hiddenRenderData.advisor
  readonly hiddenRenderBlueprint = hiddenRenderData.blueprint

  readonly maxColumns = 3
  numColumns = 3
  tab = 0

  private filtered: Entity[] = []
  private intersection: IntersectionObserver
  displayed: Entity[] = []

  constructor(
    private changeRef: ChangeDetectorRef,
    private search: SearchService,
    private state: StateService,
  ) { }

  ngOnInit() {
    this.adaptColumnsToWidth()
    this.registerForTabChange()
    this.registerForResults()
    this.setupInfiniteScroll()
  }

  ngOnDestroy() {
    if (this.intersection) {
      this.intersection.disconnect()
    }
  }

  adaptColumnsToWidth() {
    const optimalColumns = Math.floor(window.innerWidth / 30 / rem)
    this.numColumns = Math.max(1, Math.min(optimalColumns, this.maxColumns))
  }

  trackResult(index: number, entity: Entity) {
    return entity.name
  }

  private registerForTabChange() {
    this.state.tabChange.subscribe(tab => {
      this.tab = tab
      this.displayed = empty
      this.render()
    })
  }

  private registerForResults() {
    this.search.results.pipe(
      distinctUntilChanged(),
      tap(changes => {
        this.filtered = changes
        this.displayed = empty
        this.pushChunk()
      }),
    ).subscribe()
  }

  private setupInfiniteScroll() {
    const { sentinel, pushChunk } = this

    this.intersection = new IntersectionObserver(
      entries => entries[0].isIntersecting && pushChunk(),
      { threshold: [1] },
    )

    this.intersection.observe(sentinel.nativeElement)
  }

  private pushChunk = () => {
    if (this.displayed.length >= this.filtered.length) {
      this.render()
      return
    }

    if (this.displayed === empty) {
      this.displayed = []
    }

    for (let i = 0; i < chunkSize; i++) {
      const next = this.filtered[i]
      if (next) {
        this.displayed.push(next)
      } else {
        break
      }
    }

    this.render()
  }

  private render() {
    console.log(`${TABS[this.tab].id}: ${this.displayed.length}/${this.filtered.length}`)
    requestAnimationFrame(() => this.changeRef.detectChanges())
  }

}
