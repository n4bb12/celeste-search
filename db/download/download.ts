import axios, { AxiosRequestConfig } from "axios"
import Bottleneck from "bottleneck"
import chalk from "chalk"
import filenamify from "filenamify"
import { mkdirp, pathExists, writeFile } from "fs-extra"
import { dirname } from "path"

const cache: { [index: string]: Promise<any> } = {}

const limiter = new Bottleneck({
  maxConcurrent: 5,
  reservoir: 10,
  reservoirRefreshAmount: 10,
  reservoirRefreshInterval: 100,
})

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

  const config = Object.assign({}, options, {
    url,
    method: "get",
  })

  cache[filename] = limiter.schedule(() => {
    console.log(chalk.gray("Download " + url))
    return axios.request(config)
  })

  let data = filename.startsWith("download-cache/api")
    ? JSON.stringify({}, null, 2)
    : ""

  try {
    const response = await cache[filename]
    data = filename.startsWith("download-cache/api")
      ? JSON.stringify(response.data, null, 2)
      : response.data
  } catch (error) {
    console.error(error.stack)
  }

  await mkdirp(dirname(filename))
  await writeFile(filename, data)

  return filename
}
