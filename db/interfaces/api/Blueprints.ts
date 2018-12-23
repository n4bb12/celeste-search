export interface Blueprint {
  name: string
  icon: string
  rollovertextid: number
  displaynameid: number
  stacksize: number
  offertype: string
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
  protounit: string
  cost: {
    material: Array<{
      id: string,
      quantity: number,
    }>,
  }
}

export interface Blueprints {
  timestamp: string
  data: {
    [index: string]: Blueprint,
  }
}
