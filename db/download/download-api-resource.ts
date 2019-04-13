import {
  Advisors,
  Blueprints,
  CreteLeaderboard,
  Designs,
  EconQuests,
  HalloweenEventLeaderboard,
  Languages,
  LootRolls,
  Marketplace,
  Materials,
  Online,
  Prototypes,
  Registered,
  SpartaLeaderboard,
  Stores,
  Traits,
  UserProfile,
  WinterEventLeaderboard,
} from "celeste-api-types"
import { readJson } from "fs-extra"

import { download } from "./download"

const cache = {}

async function downloadApiResource<T extends { data: any }>(resource: string): Promise<T["data"]> {
  return cache[resource] = cache[resource] || get(resource)
}

async function get(resource: string) {
  const url = "https://api.projectceleste.com" + resource
  const options = { headers: { Accept: "application/json" } }

  const filename = await download(url, options)
  const res = await readJson(filename)

  return res.data
}

export class API {

  // Game

  static getAdvisors() {
    return downloadApiResource<Advisors>("/game/advisors")
  }
  static getBlueprints() {
    return downloadApiResource<Blueprints>("/game/blueprints")
  }
  static getDesigns() {
    return downloadApiResource<Designs>("/game/designs")
  }
  static getEconQuests() {
    return downloadApiResource<EconQuests>("/game/econquests")
  }
  static getLanguages() {
    return downloadApiResource<Languages>("/game/languages")
  }
  static getLootRolls() {
    return downloadApiResource<LootRolls>("/game/lootrolls")
  }
  static getMaterials() {
    return downloadApiResource<Materials>("/game/materials")
  }
  static getTraits() {
    return downloadApiResource<Traits>("/game/traits")
  }
  static getPrototypes() {
    return downloadApiResource<Prototypes>("/game/protodata")
  }

  // Leaderboard

  static getLeaderboard(name: "crete_coop" | "crete_solo"): Promise<CreteLeaderboard>
  static getLeaderboard(name: "halloween"): Promise<HalloweenEventLeaderboard>
  static getLeaderboard(name: "sparta_1v1" | "sparta_2v2"): Promise<SpartaLeaderboard>
  static getLeaderboard(name: "winter"): Promise<WinterEventLeaderboard>

  static getLeaderboard(name: string) {
    return downloadApiResource(`/leaderboards/${name}`)
  }

  // Marketplace

  static getMarketplace() {
    return downloadApiResource<Marketplace>("/marketplace")
  }

  // Stores

  static getStores() {
    return downloadApiResource<Stores>("/stores")
  }

  // Users

  static getUserProfile(id: string) {
    return downloadApiResource<UserProfile>(`/users/${id}/profile`)
  }
  static getOnlineUsers() {
    return downloadApiResource<Online>(`/users/online`)
  }
  static getRegisteredUsers() {
    return downloadApiResource<Registered>(`/users/registered`)
  }

}
