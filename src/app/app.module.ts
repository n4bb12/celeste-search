import { HttpClientModule } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { ReactiveFormsModule } from "@angular/forms"
import { BrowserModule } from "@angular/platform-browser"

import { AppComponent } from "./app.component"
import { AwaitFontDirective } from "./await-font.directive"
import { LegalComponent } from "./legal/legal.component"
import { ResultsComponent } from "./results/results.component"
import { SearchComponent } from "./search/search.component"

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultsComponent,
    LegalComponent,
    AwaitFontDirective,
  ],
  imports: [
  BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
