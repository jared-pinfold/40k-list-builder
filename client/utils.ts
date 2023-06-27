import { Unit } from "./models";

export function sortStr (a: Unit, b: Unit): number {
  const aName = a.name.toLowerCase()
  const bName = b.name.toLowerCase()

  if (aName < bName) return -1
  if (aName > bName) return 1
  return 0
}