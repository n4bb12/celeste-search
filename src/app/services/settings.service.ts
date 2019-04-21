import { Injectable } from "@angular/core"
import { FormControl } from "@angular/forms"

export interface Settings {
  precision: string
  maxColumns: string
}

const key = "setting"

@Injectable({
  providedIn: "root",
})
export class SettingsService {

  readonly precision = new FormControl()
  readonly maxColumns = new FormControl()

  constructor() {
    this.init()
    this.syncStorageChanges()
    this.syncMemoryChanges()
  }

  private defaults(): Settings {
    return {
      precision: "1",
      maxColumns: "3",
    }
  }

  private save() {
    window.localStorage.setItem(key, JSON.stringify({
      precision: this.precision.value,
      maxColumns: this.maxColumns.value,
    }))
  }

  private load(): Settings {
    try {
      return JSON.parse(window.localStorage.getItem(key)) || this.defaults()
    } catch (error) {
      console.error(error)
      return this.defaults()
    }
  }

  private init() {
    const settings = this.load()

    this.precision.setValue(settings.precision)
    this.maxColumns.setValue(settings.maxColumns)

    this.save()
  }

  private syncStorageChanges() {
    window.addEventListener("storage", event => {
      if (event.key !== key) {
        return
      }
      this.init()
    })
  }

  private syncMemoryChanges() {
    this.precision.valueChanges.subscribe(() => this.save())
    this.maxColumns.valueChanges.subscribe(() => this.save())
  }

}
