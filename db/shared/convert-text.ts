import chalk from "chalk"

import { API } from "../download"

/**
 * Returns an english translation from the API.
 */
export async function translateEn(id: number, fallback?: string): Promise<string> {
  const languages = await API.getLanguages()

  const translation =
    languages.stringtablex.language.English.string[id] ||
    languages.econstrings.language.English.string[id]

  if (translation && translation.text) {
    return translation.text
  }

  console.log(chalk.yellow(`No translation found for ${id}, falling back to ${fallback}`))
  return fallback
}
