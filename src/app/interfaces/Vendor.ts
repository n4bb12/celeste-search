export interface Vendor {
  id: string
  name: string
  location: string
  blueprint: true | undefined
  level: number | undefined
  rarity: "legendary" | "epic" | "rare" | "uncommon" | "common" | undefined
  price: number
  currency: "coin" | "empire" | "sparta" | "crete" | "halloween" | "winter"
  rotation: string | undefined
}
