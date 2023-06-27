import { List, Unit } from "./models";
import JsPDF from 'jspdf'

export function sortStr (a: Unit, b: Unit): number {
  const aName = a.name.toLowerCase()
  const bName = b.name.toLowerCase()

  if (aName < bName) return -1
  if (aName > bName) return 1
  return 0
}

export function exportPDF (list: List, form: {armyName: string, pointsLimit: number}, points: number) {
const ExportList = new JsPDF()
    const flatList = [
      ...list.characters,
      ...list.battleline,
      ...list.other,
      ...list.dedicatedTransport,
    ]
    let yCoord = 20
    ExportList.setFontSize(20)
    ExportList.text(20, yCoord, `${form.armyName} - ${points}pts`)
    yCoord += 10
    flatList.map((unit) => {
      if (yCoord > 275) {
        ExportList.addPage()
        yCoord = 20
      }
      ExportList.setFontSize(15)
      ExportList.text(
        20,
        yCoord,
        `${unit.models} ${unit.name} - ${unit.points}pts`
      )
      yCoord += 5
      ExportList.setFontSize(10)
      ExportList.text(20, yCoord, `Wargear: ${unit.wargear}`)
      console.log('map ', unit.name, ' ', yCoord)
      yCoord += 10
    })
    ExportList.save(`${form.armyName.replace(/ /gi, '_')}.pdf`)
}