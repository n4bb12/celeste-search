import { Advisor, Blueprint } from "../interfaces"
import { Item } from "../interfaces/Item"

export const hiddenRenderData: {
  item: Item,
  advisor: Advisor,
  blueprint: Blueprint,
} = {
  item: {
    id: 557,
    name: "Runic Heavy Bronze Armoring",
    type: "Armor Plating",
    levels: [
      40,
    ],
    icon: 22,
    rarity: "epic",
    effects: [
      {
        name: "Health",
        amount: 1.0398,
        scaling: 0.0134,
        beneficial: true,
      },
      {
        name: "Maximum Range",
        amount: 1.0088,
        scaling: 0.0024,
        beneficial: true,
      },
      {
        name: "Movement Speed",
        amount: 1.0013,
        scaling: 0.0004,
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
        name: "Blueprint, Exquisite Epic Edges",
        level: 40,
        currency: "coin",
        price: 1750,
      },
    ],
    search: "search",
  },
  advisor: {
    name: "Alexander The Great",
    age: 4,
    level: 40,
    rarities: {
      legendary: {
        icon: 338,
        description: "Toxotai and Peltasts attack 25% faster and can attack and see 10% farther",
      },
    },
    vendors: [
      {
        name: "Massalia, General Store",
        rarity: "uncommon",
        currency: "coin",
        price: 225,
      },
    ],
    search: "search",
  },
  blueprint: {
    name: "Small Delian Residence",
    description: "Use: Builds a Small Delian Residence (decoration)",
    icon: 237,
    rarity: "common",
    materials: [],
    vendors: [
      {
        name: "Delos, General Store",
        level: 0,
        currency: "empire",
        price: 50,
      },
    ],
    search: "search",
  },
}
