import crypto from "crypto"
import { copy, mkdirp } from "fs-extra"
import nanoid from "nanoid"
import { dirname } from "path"

import { download } from "./download"

const pathToId: { [iconPath: string]: Promise<string> } = {}

export async function downloadIcon(resource: string, spriteName: string, iconName?: string): Promise<string> {
  return pathToId[resource + spriteName]
    = pathToId[resource + spriteName] || fetch(resource, spriteName, iconName)
}

function hash(data: string): string {
  return crypto
    .createHash("sha1")
    .update(data)
    .digest("base64")
    .replace(/[\W]/g, "")
    .substr(0, 8)
}

async function fetch(path: string, spriteName: string, iconName?: string) {
  const iconId = hash(path)
  const imagePath = path.replace(/\\/g, "/") + ".png"
  const spriteInput = `generated/sprites/${spriteName}/${iconName || iconId}.png`
  const url = `https://images.projectceleste.com/${imagePath}`
  const options = { responseType: "arraybuffer" } as const

  const filename = await download(url, options)
  await mkdirp(dirname(spriteInput))
  await copy(filename, spriteInput)

  return iconId
}
