import { copy, mkdirp } from "fs-extra"
import { dirname } from "path"

import { download } from "./download"

const pathToId: { [iconPath: string]: Promise<number> } = {}
const nextIconId: { [sprite: string]: number } = {}

export async function downloadIcon(resource: string, spriteName: string, iconName?: string): Promise<number> {
  return pathToId[resource + spriteName]
    = pathToId[resource + spriteName] || fetch(resource, spriteName, iconName)
}

async function fetch(path: string, spriteName: string, iconName?: string) {

  const iconId = nextIconId[spriteName] || 0
  nextIconId[spriteName] = iconId + 1

  const imagePath = path.replace(/\\/g, "/") + ".png"
  const spriteInput = `generated/sprites/${spriteName}/${iconName || iconId}.png`
  const url = `https://images.projectceleste.com/${imagePath}`
  const options = { responseType: "arraybuffer" }

  const filename = await download(url, options)
  await mkdirp(dirname(spriteInput))
  await copy(filename, spriteInput)

  return iconId
}
