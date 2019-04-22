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
    name: "name",
    trait: "ArmorPlt_E006",
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
        name: "Blueprint, Exquisite Epic Edges",
        level: 40,
        currency: "coin",
        price: 1750,
      },
    ],
    search: "search",
  },
  advisor: {
    name: "name",
    age: 4,
    level: 40,
    rarities: {
      legendary: {
        icon: 338,
        description: "description",
      },
    },
    vendors: [
      {
        name: "name",
        rarity: "uncommon",
        currency: "coin",
        price: 225,
      },
    ],
    search: "search",
  },
  blueprint: {
    name: "name",
    description: "description",
    icon: 237,
    rarity: "common",
    materials: [],
    vendors: [
      {
        name: "name",
        level: 0,
        currency: "empire",
        price: 50,
      },
    ],
    search: "search",
  },
  design: {
    name: "name",
    description: "description",
    icon: 2,
    rarity: "uncommon",
    materials: [
      {
        id: "AnimalHide",
        quantity: 26,
      },
    ],
    search: "search",
  },
  consumable: {
    name: "name",
    search: "search",
  },
}
