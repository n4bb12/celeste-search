const displayNames = {
  Egypt: "Egyptian",
  Greek: "Greek",
  Celt: "Celtic",
  Persia: "Persian",
  Norse: "Norse",
  Babylonian: "Babylonian",
}

export function convertCivilization(civilization: string): string {
  return displayNames[civilization]
}
