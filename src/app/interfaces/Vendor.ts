export interface Vendor {
  name: string
  level?: number
  rarity?: "legendary" | "epic" | "rare" | "uncommon" | "common"
  price: number
  currency: "coin" | "empire" | "sparta" | "crete"
  rotation?: string
}
