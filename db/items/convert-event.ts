import { Trait } from "celeste-api-types"

import { Item } from "../interfaces"

import { isHalloween2018Reward, isWinter2018Reward } from "./source"

export function convertEvent(trait: Trait): Item["event"] | undefined {
  if (isHalloween2018Reward(trait)) {
    return {
      name: "halloween",
      year: 2018,
    }
  }
  if (isWinter2018Reward(trait)) {
    return {
      name: "winter",
      year: 2018,
    }
  }
}
