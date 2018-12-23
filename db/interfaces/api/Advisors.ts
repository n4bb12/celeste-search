export interface Advisor {
  name: string
  groupid: number
  tech: number
  rarity: string
  icon: string
  icontexturecoords: string
  rollovertextid: string
  displaynameid: number
  displaydescriptionid: number
  sellcostoverride: {
    capitalresource: {
      quantity: number,
      type: string,
    },
  }
  minlevel: number
  itemlevel: number
  offertype: string
  techs: {
    tech: string,
  },
  sellable: string
  tradeable: string
  destroyable: string
  civilization: string
}

export interface Advisors {
  timestamp: string
  data: {
    [index: string]: Advisor,
  }
}
