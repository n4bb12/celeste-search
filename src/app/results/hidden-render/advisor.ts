import { Advisor } from "../../interfaces"

export const advisor: Advisor = {
  id: "advisor_id",
  name: "name",
  age: 4,
  level: 40,
  civilization: "greek",
  rarities: {
    legendary: {
      id: "rarity_id",
      icon: 338,
      description: "description",
    },
  },
  vendors: [
    {
      id: "gn_Cap_LootStore06",
      name: "name",
      location: "location",
      rarity: "uncommon",
      currency: "coin",
      price: 225,
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
