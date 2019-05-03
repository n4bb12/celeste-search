import { Design } from "../../interfaces"

export const design: Design = {
  id: "design_id",
  description: "description",
  icon: 2,
  rarity: "uncommon",
  school: "Craftsmen",
  materials: [
    {
      id: "AnimalHide",
      quantity: 26,
    },
  ],
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
  outputId: "design_output_id",
  outputName: "name",
  outputIcon: 2,
  search: "search",
  searchDynamic: "searchDynamic",
}
