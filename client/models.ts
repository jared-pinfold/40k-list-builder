export interface Unit {
  id: number
  name: string
  models: number
  wargear: string
  points: number
}

export interface List {
  characters: Unit[]
  battleline: Unit[]
  other: Unit[]
  dedicatedTransport: Unit[]
}

export interface Form {
  armyName: string
  pointsLimit: number
}