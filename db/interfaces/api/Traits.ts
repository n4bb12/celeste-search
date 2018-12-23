export interface Effect {
  target: {
    type: string,
  }
  type: string
  bonus: string
  amount: number
  scaling: number
  subtype: string
  visible: string
  relativity: string
  action?: string
  damagetype?: string
  unittype?: string
  resource?: string
}

export interface Trait {
  name: string
  dbid: number
  traittype: string
  rarity: string
  icon: string
  rollovertextid: number
  displaynameid: number
  offertype: string
  itemlevels: number[]
  visualfactor: Array<{
    type: string,
    factor: number,
  }>
  sellable: string
  tradeable: string
  destroyable: string
  canbestoredingearhall: string
  effects: {
    effect: Effect[],
  }
}

export interface Traits {
  timestamp: string
  data: {
    [index: string]: Trait,
  }
}
