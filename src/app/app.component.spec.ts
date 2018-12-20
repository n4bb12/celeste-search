import { HttpClientModule } from "@angular/common/http"
import { async, TestBed } from "@angular/core/testing"
import { ReactiveFormsModule } from "@angular/forms"

import { NgScrollbarModule } from "ngx-scrollbar"

import { AppComponent } from "./app.component"
import { AwaitFontDirective } from "./await-font.directive"
import { BackToTopComponent } from "./back-to-top/back-to-top.component"
import { ComparisonComponent } from "./comparison/comparison.component"
import { LegalComponent } from "./legal/legal.component"
import { ResultsComponent } from "./results/results.component"
import { SearchComponent } from "./search/search.component"
import { TabsComponent } from "./tabs/tabs.component"

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        NgScrollbarModule,
        ReactiveFormsModule,
      ],
      declarations: [
        AppComponent,
        AwaitFontDirective,
        BackToTopComponent,
        ComparisonComponent,
        LegalComponent,
        ResultsComponent,
        SearchComponent,
        TabsComponent,
      ],
    }).compileComponents()
  }))

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  })
})
