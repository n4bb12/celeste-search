export interface Material {
  name: string
  icon: string
  rarity: string
}

export interface Materials {
  [key: string]: Material
}
