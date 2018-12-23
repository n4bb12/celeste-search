export interface RegisteredUser {
  Xuid: number
  UserName: string
  Rank: string
}

export interface Registered {
  timestamp: string
  data: RegisteredUser[]
}
