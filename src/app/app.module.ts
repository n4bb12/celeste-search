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
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    SearchComponent,
    ResultsComponent,
    LegalComponent,
    AwaitFontDirective,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
