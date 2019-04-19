import { Trait } from "celeste-api-types"

const cyprusLegendaries = [
  "ArrowOH_L001",
  "Bow1H_L001",
  "Staff2H_L002",
  "Sword1H_L001",
  "Shield1H_L001",
  "ArmorLgt_L001",
  "Spear2H_L002_SR",
  "ArmorMed_L002",
  "Gear_L001",
  "ArmorPlt_L001",
]

const allianceCouncilOfImhotep = [
  "ArmorBldg_LC01",
  "FishingNet1H_LC01",
  "Gear_Prst_LC01",
]

const allianceDelianLeague = [
  "Tool1H_LC01",
  "Gear_Bldg_LC01",
  "ArmorMed_LC01",
]

const allianceLegionOfCarthage = [
  "ArmorPlt_LC01",
  "ArrowOH_LC01",
  "Gear_LC01",
]

const questRewards = [
  "Spears2H_ALS",
  "Bow1H_UASB",
]

const eventHalloween = [
  "Sword1H_R005_LEG",
]

const eventWinter = [
  "Arrows_IceKing_LEG",
  "Axe2H_IceKing_LEG",
  "Staff2H_IceKing_LEG",
  "Sling2H_IceKing_LEG",
]

/**
 * Starting at this ID, all items were created by the celeste team.
 */
const celesteLegendariesStart = 2259

export function isSoldByCyprus(trait: Trait) {
  return cyprusLegendaries.includes(trait.name)
}

export function isSoldByCouncilOfImhotep(trait: Trait) {
  return allianceCouncilOfImhotep.includes(trait.name)
}

export function isSoldByDelianLeague(trait: Trait) {
  return allianceDelianLeague.includes(trait.name)
}

export function isSoldByLegionOfCarthage(trait: Trait) {
  return allianceLegionOfCarthage.includes(trait.name)
}

export function isSoldForCoin(trait: Trait) {
  return isSoldByCyprus(trait)
    || isSoldByCouncilOfImhotep(trait)
    || isSoldByDelianLeague(trait)
    || isSoldByLegionOfCarthage(trait)
}

export function isQuestReward(trait: Trait) {
  return questRewards.includes(trait.name)
}

export function isHalloweenReward(trait: Trait) {
  return eventHalloween.includes(trait.name)
}

export function isWinterReward(trait: Trait) {
  return eventWinter.includes(trait.name)
}

export function isEventReward(trait: Trait) {
  return isHalloweenReward(trait)
    || isWinterReward(trait)
}

/**
 * Only legendaries are reforgeable, so we only need to look
 * at a few items.
 */
export function isReforgeable(trait: Trait) {
  return trait.rarity === "legendary"
    && !isSoldForCoin(trait)
    && !isQuestReward(trait)
    && !isEventReward(trait)
}

export function isClassicItem(trait: Trait) {
  return trait.dbid < celesteLegendariesStart
}
