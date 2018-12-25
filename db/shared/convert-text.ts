import { API } from "../download"

/**
 * Returns an english translation from the API.
 */
export async function translateEn(id: number): Promise<string> {
  const languages = await API.getLanguages()

  const translation =
    languages.stringtablex.language.English.string[id] ||
    languages.econstrings.language.English.string[id]

  if (!translation) {
    throw new Error("No translation found for " + id)
  }

  return translation.text
}
