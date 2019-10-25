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
      icon: "CxsWN9Z6",
      description: "description",
    },
  },
  vendors: [
    {
      id: "gn_Cap_LootStore06",
      name: "name",
      location: "location",
      level: 0,
      currency: "coin",
      price: 225,
      rarity: "uncommon",
      rotation: "classic",
      blueprint: true,
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
