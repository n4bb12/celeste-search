import chalk from "chalk"
import { get } from "lodash"

import { API } from "../download"

/**
 * Returns an english translation from the API.
 */
export async function translateEn(id: number): Promise<string | undefined>
export async function translateEn(id: number, fallback: string): Promise<string>
export async function translateEn(id: number, fallback?: string) {
  const languages = await API.getLanguages()

  const translation =
    get(languages, `stringtablex.language.English.string[${id}].text`) ||
    get(languages, `econstrings.language.English.string[${id}].text`)

  if (!translation) {
    console.log(chalk.yellow(`No translation found for ${id}, falling back to ${fallback}`))
  }

  return translation || fallback
}
