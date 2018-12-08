export interface Material {
  name: string
  icon: string
  rollovertextid: number
  displaynameid: number
  stackable: string
  stacksize: number
  offertype: number
  itemlevel: number
  sellable: string
  tradeable: string
  destroyable: string
  sellcostoverride: {
    capitalresource: {
      quantity: number,
      type: string,
    },
  }
  rarity: string
  budgetcost: number
  contentpack: number
}

export interface Materials {
  timestamp: string
  data: {
    [index: string]: Material,
  }
}
