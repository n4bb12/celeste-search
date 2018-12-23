export interface MarketplaceItem {
  ItemID: string
  ItemType: string
  ItemLevel: number
  ItemCount: number
  ItemPrice: number
  DateTimeExpiry: string
  ItemSeed: number
}

export interface Marketplace {
  timestamp: string
  data: MarketplaceItem[]
}
