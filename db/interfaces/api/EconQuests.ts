export interface EconQuest {
  name: string
  questid: number
  icon: string
  icontexturecoords: string
  rollovertextid: number
  displaynameid: number
  typeid: number
  itemlevel: number
  offertype: number
  rarity: number
  summary: {
    stringid: string[],
  }
}

export interface EconQuests {
  timestamp: string
  data: {
    [index: string]: EconQuest,
  }
}
