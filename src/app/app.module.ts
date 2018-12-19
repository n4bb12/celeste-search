import { HttpClientModule } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { ReactiveFormsModule } from "@angular/forms"
import { BrowserModule } from "@angular/platform-browser"

import { NgScrollbarModule } from "ngx-scrollbar"

import { AppComponent } from "./app.component"
import { AwaitFontDirective } from "./await-font.directive"
import { BackToTopComponent } from "./back-to-top/back-to-top.component"
import { LegalComponent } from "./legal/legal.component"
import { ResultsComponent } from "./results/results.component"
import { SearchComponent } from "./search/search.component"

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgScrollbarModule,
  ],
  declarations: [
    AppComponent,
    AwaitFontDirective,
    BackToTopComponent,
    LegalComponent,
    ResultsComponent,
    SearchComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
