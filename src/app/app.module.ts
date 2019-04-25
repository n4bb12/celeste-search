import { HttpClientModule } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { ReactiveFormsModule } from "@angular/forms"
import { BrowserModule } from "@angular/platform-browser"
import { RouterModule } from "@angular/router"
import { ServiceWorkerModule } from "@angular/service-worker"

import { ClickOutsideModule } from "ng-click-outside"
import { NgScrollbarModule } from "ngx-scrollbar"

import { environment } from "../environments/environment"

import { AppComponent } from "./app.component"
import { AwaitFontDirective } from "./await-font.directive"
import { BackToTopComponent } from "./back-to-top/back-to-top.component"
import { IconButtonComponent } from "./icon-button/icon-button.component"
import { IconComponent } from "./icon/icon.component"
import { LegalComponent } from "./legal/legal.component"
import {
  CurrencyPipe,
  EffectValuePipe,
  KeysPipe,
  PricePipe,
  PriceRangePipe,
} from "./pipes"
import {
  PrimaryButtonComponent,
} from "./primary-button/primary-button.component"
import { AdvisorComponent } from "./results/advisor/advisor.component"
import { BlueprintComponent } from "./results/blueprint/blueprint.component"
import { ConsumableComponent } from "./results/consumable/consumable.component"
import { DesignComponent } from "./results/design/design.component"
import { ItemComponent } from "./results/item/item.component"
import { ResultsComponent } from "./results/results.component"
import { SearchComponent } from "./search/search.component"
import { SidebarComponent } from "./sidebar/sidebar.component"
import { TabsComponent } from "./tabs/tabs.component"
import { TooltipComponent } from "./tooltip/tooltip.component"

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    NgScrollbarModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    ClickOutsideModule,
    ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production }),
  ],
  declarations: [
    AdvisorComponent,
    AppComponent,
    AwaitFontDirective,
    BackToTopComponent,
    BlueprintComponent,
    ConsumableComponent,
    CurrencyPipe,
    PriceRangePipe,
    PricePipe,
    DesignComponent,
    EffectValuePipe,
    IconButtonComponent,
    IconComponent,
    ItemComponent,
    KeysPipe,
    LegalComponent,
    PrimaryButtonComponent,
    ResultsComponent,
    SearchComponent,
    SidebarComponent,
    TabsComponent,
    TooltipComponent,
  ],
  providers: [
    PricePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
