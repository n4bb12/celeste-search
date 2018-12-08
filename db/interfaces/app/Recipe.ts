export interface Recipe {
  school: string
  level: number
  materials: Array<{ id: string, quantity: number }>
}
