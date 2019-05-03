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
      id: "alexander_l_iv",
      rarity: "legendary",
      level: 40,
    },
  ],
  search: "search",
}
