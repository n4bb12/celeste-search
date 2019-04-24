import chalk from "chalk"

export function convertRarity(id: string) {
  if (id.includes("_C")) {
    return "common"
  }
  if (id.includes("_U")) {
    return "uncommon"
  }
  if (id.includes("_R")) {
    return "rare"
  }
  if (id.includes("_E")) {
    return "epic"
  }
  if (id.includes("_L")) {
    return "legendary"
  }
  if (id.startsWith("Vanity")) {
    return
  }
  if (id.startsWith("Van_")) {
    return
  }
  if (id.startsWith("Create")) {
    return
  }
  if (id.startsWith("Craft")) {
    return
  }
  if (id.startsWith("General")) {
    return
  }
  if (id.startsWith("Pantheon")) {
    return
  }
  if (id.includes("BasicStore")) {
    return
  }
  if (id.includes("Resident0")) {
    return
  }
  if (id.includes("Warehouse")) {
    return
  }
  console.log(chalk.yellow(`Can't determine rarity for ${id}`))
}
