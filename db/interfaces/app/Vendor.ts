export interface Vendor {
  name: string
  level: number
  price: number
  currency: "coin" | "empire" | "sparta" | "crete"
  rotation?: string
}
