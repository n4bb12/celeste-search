export interface OnlineUser {
  Xuid: number
  UserName: string
  Rank: string
  RichPresenceId: number
}

export interface Online {
  timestamp: string
  data: OnlineUser[]
}
