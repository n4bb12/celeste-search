import { copy, mkdirp } from "fs-extra"
import { dirname } from "path"

import { download } from "./download"

const pathToId: { [iconPath: string]: Promise<number> } = {}
const nextIconId: { [sprite: string]: number } = {}

export async function downloadIcon(resource: string, spriteName: string, iconName?: string): Promise<number> {
  return pathToId[resource] = pathToId[resource] || get(resource, spriteName, iconName)
}

async function get(resource: string, spriteName: string, iconName?: string) {
  const iconId = nextIconId[spriteName] || 0
  nextIconId[spriteName] = iconId + 1

  const path = resource.replace(/\\/g, "/")
  const spriteInput = `generated/sprites/${spriteName}/${iconName || iconId}.png`
  const url = `https://images.projectceleste.com/Art/${path}.png`
  const options = { responseType: "arraybuffer" }

  const filename = await download(url, options)
  await mkdirp(dirname(spriteInput))
  await copy(filename, spriteInput)

  return iconId
}
