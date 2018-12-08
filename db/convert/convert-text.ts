import { downloadApiResource } from "../download"
import { Languages } from "../interfaces/api"

/**
 * Returns an english translation from the API.
 */
export async function translateEn(id: number): Promise<string> {
  const languages = await downloadApiResource<Languages>("/game/languages")

  const translation =
    languages.data.stringtablex.language.English.string[id] ||
    languages.data.econstrings.language.English.string[id]

  return translation.text
}
