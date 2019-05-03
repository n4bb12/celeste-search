import { Blueprint } from "../../interfaces"

export const blueprint: Blueprint = {
  id: "blueprint_id",
  name: "name",
  description: "description",
  icon: 237,
  rarity: "common",
  materials: [],
  vendors: [
    {
      id: "gn_Cap_LootStore06",
      name: "name",
      location: "location",
      level: 0,
      currency: "empire",
      price: 50,
    },
  ],
  marketplace: [
    {
      ItemID: "Mehrab_R_III",
      ItemType: "Advisor",
      ItemLevel: 7,
      ItemCount: 1,
      ItemPrice: 5000,
      DateTimeExpiry: "2019-05-27T15:16:49.5272071Z",
      ItemSeed: 0,
    },
  ],
  search: "search",
  searchDynamic: "searchDynamic",
}
