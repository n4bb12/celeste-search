import {
  Advisors,
  Blueprints,
  Designs,
  Languages,
  Marketplace,
  Materials,
  Prototypes,
  Traits,
} from "celeste-api-types"
import { readJson } from "fs-extra"

import { download } from "./download"

const cache = {}

async function fetch(path: string) {
  const url = "https://api.projectceleste.com" + path
  const options = { headers: { Accept: "application/json" } }

  const filename = await download(url, options)
  const res = await readJson(filename)

  return res.data
}

async function get<T extends { data: any }>(path: string): Promise<T["data"]> {
  return cache[path] = cache[path] || fetch(path)
}

function lowerCaseKeys<T>(json: T) {
  Object.keys(json).forEach(key => {
    if (key !== key.toLowerCase()) {
      json[key.toLowerCase()] = json[key]
      delete json[key]
    }
  })
}

function lowerCaseName<T>(json: T) {
  Object.values(json).forEach(value => {
    value.name = value.name.toLowerCase()
  })
}

function lowerCaseProtounit<T>(json: T) {
  Object.values(json).forEach(value => {
    value.protounit = value.protounit.toLowerCase()
  })
}

export class API {

  static async getTraits() {
    const json = await get<Traits>("/game/traits")
    lowerCaseKeys(json)
    lowerCaseName(json)
    return json
  }

  static async getAdvisors() {
    const json = await get<Advisors>("/game/advisors")
    lowerCaseKeys(json)
    lowerCaseName(json)
    return json
  }

  static async getBlueprints() {
    const json = await get<Blueprints>("/game/blueprints")

    lowerCaseKeys(json)
    lowerCaseName(json)
    lowerCaseProtounit(json)

    Object.values(json).forEach(entry => {
      entry.cost.material.forEach(input => {
        input.id = input.id.toLowerCase()
      })
    })

    return json
  }

  static async getDesigns() {
    const json = await get<Designs>("/game/designs")

    lowerCaseKeys(json)
    lowerCaseName(json)

    Object.values(json).forEach(entry => {
      entry.input.material.forEach(input => {
        input.id = input.id.toLowerCase()
      })
    })
    Object.values(json).forEach(entry => {
      Object.keys(entry.output).forEach(type => {
        const output = entry.output[type]
        output.id = output.id.toLowerCase()
      })
    })

    return json
  }

  static async getPrototypes() {
    const json = await get<Prototypes>("/game/protodata")
    lowerCaseKeys(json)
    lowerCaseName(json)
    return json
  }

  static async getMaterials() {
    const json = await get<Materials>("/game/materials")
    lowerCaseKeys(json)
    lowerCaseName(json)
    return json
  }

  static async getLanguages() {
    const json = await get<Languages>("/game/languages")
    return json
  }

  static async getVendors() {
    const json = await get<any>("/game/vendors")

    lowerCaseKeys(json)
    lowerCaseName(json)
    lowerCaseProtounit(json)

    Object.values<any>(json).forEach(vendor => {
      const items = vendor.itemsets.itemset.items.item
      items.forEach(item => {
        Object.values<any>(item.purchase).forEach(sold => {
          sold.id = sold.id.toLowerCase()
        })
      })
    })

    return json
  }

  static async getMarketplace() {
    const json = await get<Marketplace>("/marketplace")
    json.forEach(offering => {
      offering.ItemID = offering.ItemID.toLowerCase()
    })
    return json
  }

}
