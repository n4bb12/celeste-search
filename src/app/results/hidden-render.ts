import { Advisor, Blueprint, Consumable, Design } from "../interfaces"
import { Item } from "../interfaces/Item"

export const hiddenRenderData: {
  item: Item,
  advisor: Advisor,
  blueprint: Blueprint,
  design: Design,
  consumable: Consumable,
} = {
  item: {
    id: "item_id",
    name: "name",
    type: "Armor Plating",
    levels: [
      40,
    ],
    icon: 22,
    rarity: "epic",
    effects: [
      {
        name: "name",
        amount: 1.0398,
        scaling: 0.0134,
        beneficial: true,
      },
    ],
    effectsRange: true,
    recipe: {
      school: "Engineering",
      level: 40,
      materials: [
        {
          id: "4ObsidianBlock",
          quantity: 18,
        },
        {
          id: "4PhilosopherStone",
          quantity: 8,
        },
        {
          id: "4ArchimedesTool",
          quantity: 4,
        },
      ],
    },
    vendors: [
      {
        id: "gn_Cap_LootStore06",
        name: "name",
        location: "location",
        blueprint: true,
        level: 40,
        currency: "coin",
        price: 1750,
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
    quest: "quest",
    event: { name: "halloween", year: 2018 },
    starting: ["persian", "babylonian", "norse"],
    search: "search",
  },
  advisor: {
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
  },
  blueprint: {
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
  },
  design: {
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
    outputLevel: 2,
    search: "search",
  },
  consumable: {
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
  },
}
