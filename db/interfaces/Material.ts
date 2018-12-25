export interface Material {
  name: string
  icon: number
  rarity: string
}

export interface Materials {
  [key: string]: Material
}
