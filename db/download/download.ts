import axios, { AxiosRequestConfig } from "axios"
import chalk from "chalk"
import filenamify from "filenamify"
import { mkdirp, pathExists, writeFile } from "fs-extra"
import { isPlainObject } from "lodash"
import { dirname } from "path"

const cache: { [index: string]: Promise<any> } = {}

/**
 * This serves as a download proxy and caches downloaded
 * files for faster local development.
 */
export async function download(url: string, options: AxiosRequestConfig): Promise<string> {
  const filename = "download-cache/" + url
    .replace(/\\/g, "/")
    .replace("https://", "")
    .split("/")
    .map(segment => filenamify(segment))
    .join("/")

  if (cache[filename]) {
    await cache[filename]
    return filename
  }

  if (await pathExists(filename)) {
    cache[filename] = Promise.resolve()
    return filename
  }

  console.log(chalk.gray("Download " + url))

  const config = Object.assign({}, options, {
    url,
    method: "get",
  })

  cache[filename] = axios.request(config)
  const response = await cache[filename]

  await mkdirp(dirname(filename))
  const data = isPlainObject(response.data)
    ? JSON.stringify(response.data, null, 2)
    : response.data
  await writeFile(filename, data)

  return filename
}
