export function convertCivilization(civilization: string | undefined) {
  if (civilization) {
    return civilization.substr("eCivMatchingType".length).toLowerCase()
  }
}
