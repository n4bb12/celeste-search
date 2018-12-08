export interface Design {
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
  productionpoints: number
  input: {
    material: Array<{
      id: string
      quantity: number,
    }>,
  }
  output: {
    trait: {
      id: string
      quantity: number,
      level: number,
    },
  }
  outputtraitlevel: number
  autolearn: string
  autorepeat: string
  tohopper: string
  ignoreschool: string
  advanced: string
  tag: string
  budgetmodifier: number
}

export interface Designs {
  timestamp: string
  data: {
    [index: string]: Design,
  }
}
