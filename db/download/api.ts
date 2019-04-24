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

async function fetch(path: string) {
  const url = "https://api.projectceleste.com" + path
  const options = { headers: { Accept: "application/json" } }

  const filename = await download(url, options)
  const res = await readJson(filename)

  return res.data
}

async function get<T extends { data: any }>(path: string): Promise<T["data"]> {
  return cache[path] = cache[path] || fetch(path)
}

export class API {

  // Game

  static getAdvisors() {
    return get<Advisors>("/game/advisors")
  }
  static getBlueprints() {
    return get<Blueprints>("/game/blueprints")
  }
  static getDesigns() {
    return get<Designs>("/game/designs")
  }
  static getEconQuests() {
    return get<EconQuests>("/game/econquests")
  }
  static getLanguages() {
    return get<Languages>("/game/languages")
  }
  static getLootRolls() {
    return get<LootRolls>("/game/lootrolls")
  }
  static getMaterials() {
    return get<Materials>("/game/materials")
  }
  static getTraits() {
    return get<Traits>("/game/traits")
  }
  static getPrototypes() {
    return get<Prototypes>("/game/protodata")
  }
  static getVendors() {
    return get<any>("/game/vendors")
  }

  // Leaderboard

  static getLeaderboard(name: "crete_coop" | "crete_solo"): Promise<CreteLeaderboard>
  static getLeaderboard(name: "halloween"): Promise<HalloweenEventLeaderboard>
  static getLeaderboard(name: "sparta_1v1" | "sparta_2v2"): Promise<SpartaLeaderboard>
  static getLeaderboard(name: "winter"): Promise<WinterEventLeaderboard>

  static getLeaderboard(name: string) {
    return get(`/leaderboards/${name}`)
  }

  // Marketplace

  static getMarketplace() {
    return get<Marketplace>("/marketplace")
  }

  // Users

  static getUserProfile(id: string) {
    return get<UserProfile>(`/users/${id}/profile`)
  }
  static getOnlineUsers() {
    return get<Online>(`/users/online`)
  }
  static getRegisteredUsers() {
    return get<Registered>(`/users/registered`)
  }

}
