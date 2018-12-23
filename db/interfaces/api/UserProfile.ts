export interface Character {
  Id: number,
  Name: string,
  Civilization: string,
  Level: number,
  Xp: number,
  LevelMaxXp: number,
  GearScore: number,
  CapCityBuildings: {
    [index: string]: number,
  }
}

export interface UserProfile {
  timestamp: string
  data: {
    Xuid: number,
    UserName: string,
    Characters: Character[],
  }
}
