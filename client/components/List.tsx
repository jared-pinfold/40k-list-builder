import { Unit, List, Form, Attribute } from "../models"
import { sortStr, exportPDF } from "../utils"
import { UnitComponent } from "./Unit"

interface Props {
  form: Form
  setPool: React.Dispatch<React.SetStateAction<List>>
  setList: React.Dispatch<React.SetStateAction<List>>
  list: List
  pool: List
  points: number
}

export function ListComponent (props: Props) {

  const {form, setPool, setList, list, pool, points } = props
  const style = { color: 'black' }

  function handleRemove(unit: Unit, category: Attribute) {
    setPool({ ...pool, [category]: [...pool[category], unit].sort(sortStr) })
    setList({
      ...list,
      [category]: list[category].filter(
        (currentUnit: Unit) => currentUnit !== unit
      ),
    })
  }

  return (
  <section className="column" id="list">
          <h2>
            Army -{' '}
            <span
              style={
                points > form.pointsLimit
                  ? { color: 'red' }
                  : { color: 'black' }
              }
            >
              {points} points
            </span>{' '}
            <button onClick={() => exportPDF(list, form, points)}>Export</button>
          </h2>


          <p>** Characters **</p>
          {list.characters ? (
            list.characters.map((unit) => (
              <UnitComponent className="unit" key={`list${unit.id}`}
              {...{
                unit, cb: handleRemove, category: "characters", buttonText: "Remove", style
              }}/>
            ))
          ) : (
            <div></div>
          )}


          <p>** Battleline **</p>
          {list.battleline &&
            list.battleline.map((unit) => (
              <UnitComponent className="unit" key={`list${unit.id}`}
              {...{
                unit, cb: handleRemove, category: "battleline", buttonText: "Remove", style
              }}/>
            ))}


          <p>** Other **</p>
          {list.other &&
            list.other.map((unit) => (
              <UnitComponent className="unit" key={`list${unit.id}`}
              {...{
                unit, cb: handleRemove, category: "other", buttonText: "Remove", style
              }}/>
            ))}


          <p>** Dedicated Transport **</p>
          {list.dedicatedTransport &&
            list.dedicatedTransport.map((unit) => (
              <UnitComponent className="unit" key={`list${unit.id}`}
              {...{
                unit, cb: handleRemove, category: "dedicatedTransport", buttonText: "Remove", style
              }}/>
            ))}
        </section>)
}