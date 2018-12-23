export interface CreteRanking {
  Xuid: number
  ProfileName: string
  LastPlayedCivId: number
  MaxScore: number
}

export interface CreteLeaderboard {
  timestamp: string
  data: CreteRanking[]
}

export interface SpartaRanking {
  Xuid: number
  ProfileName: string
  LastPlayedCivId: number
  Rating: number
  Wins: number
  Losses: number
  Streak: number
}

export interface SpartaLeaderboard {
  timestamp: string
  data: SpartaRanking[]
}

export interface WinterEventRanking {
  Xuid: number,
  UserName: string,
  TotalPoint: number
}

export interface WinterEventLeaderboard {
  timestamp: string
  data: WinterEventRanking[]
}

declare type HalloweenEventRanking = any

export interface HalloweenEventLeaderboard {
  timestamp: string
  data: HalloweenEventRanking[]
}
