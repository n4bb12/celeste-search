export type Quality = "legendary" | "epic" | "rare" | "uncommon" | "common"
export type Currency = "coin" | "empire" | "sparta" | "crete"

export interface StoreItem {
  name: string
  level?: number
  quantity?: number
  quality?: Quality
  price: number
  currency?: Currency
}

export interface Store {
  name: string
  currency?: Currency
  items: StoreItem[]
}

export interface Stores {
  timestamp: string
  data: Store[]
}
