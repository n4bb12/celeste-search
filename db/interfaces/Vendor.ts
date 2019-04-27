export interface Vendor {
  id: string
  name: string
  location: string
  blueprint?: boolean
  level?: number
  rarity?: "legendary" | "epic" | "rare" | "uncommon" | "common"
  price: number
  currency: "coin" | "empire" | "sparta" | "crete" | "halloween" | "winter"
  rotation?: string
}
