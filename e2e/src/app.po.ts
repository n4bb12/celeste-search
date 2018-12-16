import { browser, by, element } from "protractor"

export class AppPage {
  navigateTo() {
    return browser.get("/")
  }

  getSearchBox() {
    return element(by.css("cis-search input"))
  }

  getLegalText() {
    return element(by.css("cis-legal"))
  }
}
