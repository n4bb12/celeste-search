export interface Language {
  name: string
  string: {
    [index: string]: {
      _locid: number,
      text: string,
    },
  }
}

export interface Econstrings {
  id: string
  version: number
  locstart: number
  locend: number
  loccurrent: number
  language: {
    [index: string]: Language,
  }
}

export interface Equipmentstrings {
  id: string
  version: number
  locstart: number
  locend: number
  loccurrent: number
  language: {
    [index: string]: Language,
  }
}

export interface Queststringtable {
  id: string
  version: number
  language: {
    [index: string]: Language,
  }
}

export interface Stringtablex {
  id: string
  version: number
  language: {
    [index: string]: Language,
  }
}

export interface Languages {
  timestamp: string
  data: {
    econstrings: Econstrings,
    equipmentstrings: Equipmentstrings,
    queststringtable: Queststringtable,
    stringtablex: Stringtablex,
  }
}
