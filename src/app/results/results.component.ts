import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core"

import { debounce, isEqual } from "lodash"
import { Subscription } from "rxjs"
import { distinctUntilChanged, tap } from "rxjs/operators"

import { Entity } from "../../../db/interfaces"
import { fadeIn } from "../animations"
import { SearchService, StateService, TABS } from "../services"
import { SettingsService } from "../services/settings.service"

import { advisor, blueprint, consumable, design, item } from "./hidden-render"

const rem = 15
const empty = []

@Component({
  selector: "cis-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss", "./results.shared.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn],
})
export class ResultsComponent implements OnInit, OnDestroy {

  @ViewChild("sentinal", { static: true }) sentinel: ElementRef

  readonly activeTabChange = this.state.tabChange

  readonly hiddenRenderItem = item
  readonly hiddenRenderAdvisor = advisor
  readonly hiddenRenderBlueprint = blueprint
  readonly hiddenRenderDesign = design
  readonly hiddenRenderConsumable = consumable

  numColumns = 3
  tab = 0

  private filtered: Entity[] = []
  private observer: IntersectionObserver
  displayed: Entity[] = []

  private subscriptions: Subscription[] = []

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
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  updateNumColumns() {
    const optimalColumns = Math.floor(window.innerWidth / 30 / rem)
    const boundedColumns = Math.max(1, Math.min(optimalColumns, +this.settings.maxColumns.value))

    if (this.numColumns !== boundedColumns) {
      this.numColumns = boundedColumns
      this.render()
    }
  }

  trackResult(index: number, entity: Entity) {
    return entity.id
  }

  private registerForTabChange() {
    const tabChangeSub = this.state.tabChange.subscribe(tab => {
      this.tab = tab
    })
    this.subscriptions.push(tabChangeSub)
  }

  private registerForResults() {
    const pushChunk = this.pushChunk
    const pushChunkDebounced = debounce(pushChunk, 200)

    const pushChanges = (changes: Entity[]) => {
      const isEmpty = !changes.length
      const wasEmpty = !this.displayed.length

      this.filtered = changes
      this.displayed = empty

      if (isEmpty || wasEmpty) {
        pushChunk()
      } else {
        pushChunkDebounced()
      }
    }

    const resultsSub = this.search.results.pipe(
      distinctUntilChanged(isEqual),
      tap(pushChanges),
    ).subscribe()

    this.subscriptions.push(resultsSub)
  }

  private registerForSettingsChanges() {
    const maxColumnsSub = this.settings.maxColumns.valueChanges.subscribe(() => {
      requestAnimationFrame(() => this.updateNumColumns())
    })
    this.subscriptions.push(maxColumnsSub)
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
      this.changeRef.detectChanges()
    })
  }

}
