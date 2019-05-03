import { Consumable } from "../../interfaces"

export const consumable: Consumable = {
  id: "consumable_id",
  name: "name",
  description: "description",
  icon: 2,
  rarity: "uncommon",
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
  searchDynamic: "searchDynamic",
}
