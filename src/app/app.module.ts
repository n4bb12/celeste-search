import { HttpClientModule } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { ReactiveFormsModule } from "@angular/forms"
import { BrowserModule } from "@angular/platform-browser"

import { NgScrollbarModule } from "ngx-scrollbar"

import { AppComponent } from "./app.component"
import { AwaitFontDirective } from "./await-font.directive"
import { BackToTopComponent } from "./back-to-top/back-to-top.component"
import { ComparisonComponent } from "./comparison/comparison.component"
import { LegalComponent } from "./legal/legal.component"
import { ResultsComponent } from "./results/results.component"
import { SearchComponent } from "./search/search.component"
import { TabsComponent } from "./tabs/tabs.component"

@NgModule({
  imports: [
    BrowserModule,
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
  bootstrap: [AppComponent],
})
export class AppModule { }
