export interface Vendor {
  id: string
  name: string
  level?: number
  rarity?: "legendary" | "epic" | "rare" | "uncommon" | "common"
  price: number
  currency: "coin" | "empire" | "sparta" | "crete" | "halloween" | "winter"
  rotation?: string
}
