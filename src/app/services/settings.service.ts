import { Injectable } from "@angular/core"
import { FormControl } from "@angular/forms"

export interface Settings {
  precision: number
  maxColumns: number
  defaultToEverything: boolean
}

const storageKey = "setting"

@Injectable({
  providedIn: "root",
})
export class SettingsService {

  precision = new FormControl()
  maxColumns = new FormControl()
  defaultToEverything = new FormControl()

  private readonly controls: {
    [K in keyof Settings]: FormControl
  } = {
    precision: this.precision,
    maxColumns: this.maxColumns,
    defaultToEverything: this.defaultToEverything,
  }

  constructor() {
    this.init()
    this.syncStorageChanges()
    this.syncMemoryChanges()
  }

  private defaults(): Settings {
    return {
      precision: 1,
      maxColumns: 3,
      defaultToEverything: false,
    }
  }

  private snapshot(): Settings {
    return Object.keys(this.controls).reduce((result, key) => {
      result[key] = this.controls[key].value
      return result
    }, {} as Settings)
  }

  private save() {
    const settings = this.snapshot()
    const storageValue = JSON.stringify(settings)

    window.localStorage.setItem(storageKey, storageValue)
  }

  private load(): Settings {
    try {
      const storageValue = window.localStorage.getItem(storageKey)
      return storageValue && JSON.parse(storageValue) || this.defaults()
    } catch (error) {
      console.error(error)
      return this.defaults()
    }
  }

  private init() {
    const settings = this.load()

    Object.keys(this.controls).forEach(key => {
      this.controls[key].setValue(settings[key])
    })

    this.save()
  }

  private syncStorageChanges() {
    window.addEventListener("storage", event => {
      if (event.key !== storageKey) {
        return
      }
      this.init()
    })
  }

  private syncMemoryChanges() {
    Object.values(this.controls).forEach(formControl => {
      formControl.valueChanges.subscribe(() => this.save())
    })
  }

}
