import { readJson } from "fs-extra"

import { download } from "./download"

const cache = {}

export async function downloadApiResource<T>(resource: string): Promise<T> {
  return cache[resource] = cache[resource] || get(resource)
}

async function get(resource: string) {
  const url = "https://api.projectceleste.com" + resource
  const options = { headers: { Accept: "application/json" } }

  const filename = await download(url, options)
  const data = await readJson(filename)

  return data
}
