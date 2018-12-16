import { AppPage } from "./app.po"

describe("workspace-project App", () => {
  let page: AppPage

  beforeEach(() => {
    page = new AppPage()
  })

  it("should display the search box", () => {
    page.navigateTo()
    expect(page.getSearchBox().isDisplayed()).toBeTruthy()
  })

  it("should display the game content usage notice", () => {
    page.navigateTo()
    expect(page.getLegalText().isDisplayed()).toBeTruthy()
    expect(page.getLegalText().getText()).toContain("Age of Empires Online © Microsoft Corporation")
  })
})
