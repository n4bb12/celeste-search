import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core"

import { debounce } from "lodash"
import { tap } from "rxjs/operators"

import { Entity } from "../../../db/interfaces"
import { fadeIn } from "../animations"
import { SearchService, StateService, TABS } from "../services"
import { SettingsService } from "../services/settings.service"

import { hiddenRenderData } from "./hidden-render"

const rem = 15
const empty = []

@Component({
  selector: "cis-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn],
})
export class ResultsComponent implements OnInit, OnDestroy {

  @ViewChild("sentinal") sentinel: ElementRef

  readonly activeTabChange = this.state.tabChange

  readonly hiddenRenderItem = hiddenRenderData.item
  readonly hiddenRenderAdvisor = hiddenRenderData.advisor
  readonly hiddenRenderBlueprint = hiddenRenderData.blueprint
  readonly hiddenRenderDesign = hiddenRenderData.design
  readonly hiddenRenderConsumable = hiddenRenderData.consumable

  numColumns = 3
  tab = 0

  private filtered: Entity[] = []
  private observer: IntersectionObserver
  displayed: Entity[] = []

  private destroyed = false

  constructor(
    private changeRef: ChangeDetectorRef,
    private search: SearchService,
    private settings: SettingsService,
    private state: StateService,
  ) { }

  ngOnInit() {
    this.updateNumColumns()
    this.registerForTabChange()
    this.registerForResults()
    this.registerForSettingsChanges()
    this.setupInfiniteScroll()
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect()
    }
    this.destroyed = true
  }

  updateNumColumns() {
    const optimalColumns = Math.floor(window.innerWidth / 35 / rem)
    const boundedColumns = Math.max(1, Math.min(optimalColumns, +this.settings.controls.maxColumns.value))

    if (this.numColumns !== boundedColumns) {
      this.numColumns = boundedColumns
      this.render()
    }
  }

  trackResult(index: number, entity: Entity) {
    return entity.id
  }

  private registerForTabChange() {
    this.state.tabChange.subscribe(tab => {
      this.tab = tab
    })
  }

  private registerForResults() {
    const pushChunk = this.pushChunk
    const pushChunkDebounced = debounce(pushChunk, 200)

    this.search.results.pipe(
      tap(changes => {
        const isEmpty = !changes.length
        const wasEmpty = !this.displayed.length

        this.filtered = changes
        this.displayed = empty

        if (isEmpty || wasEmpty) {
          pushChunk()
        } else {
          pushChunkDebounced()
        }
      }),
    ).subscribe()
  }

  private registerForSettingsChanges() {
    this.settings.controls.maxColumns.valueChanges.subscribe(() => {
      requestAnimationFrame(() => this.updateNumColumns())
    })
  }

  private setupInfiniteScroll() {
    const { sentinel, pushChunk } = this

    const callback: IntersectionObserverCallback = entries => {
      if (entries[0].isIntersecting) {
        pushChunk()
      }
    }

    this.observer = new IntersectionObserver(callback)
    this.observer.observe(sentinel.nativeElement)
  }

  private pushChunk = () => {
    if (this.displayed.length >= this.filtered.length) {
      this.render()
      return
    }

    if (this.displayed === empty) {
      this.displayed = []
    }

    const chunkSize = Math.round(window.innerHeight * this.numColumns / 150)
    const offset = this.displayed.length
    const limit = Math.min(offset + chunkSize, this.filtered.length)

    for (let i = offset; i < limit; i++) {
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
    requestAnimationFrame(() => {
      if (!this.destroyed) {
        this.changeRef.detectChanges()
      }
    })
  }

}
