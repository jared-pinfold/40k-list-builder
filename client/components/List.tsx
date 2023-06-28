import { Unit, List, Form } from "../models"
import { sortStr, exportPDF } from "../utils"

type Attribute = keyof List
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
              <article className='unit' key={`list${unit.id}`}>
                <h3>
                  {unit.models} {unit.name} - {unit.points}pts{' '}
                  <button onClick={() => handleRemove(unit, 'characters')}>
                    Remove
                  </button>
                </h3>
                <p>Wargear: {unit.wargear}</p>
              </article>
            ))
          ) : (
            <div></div>
          )}
          <p>** Battleline **</p>
          {list.battleline &&
            list.battleline.map((unit) => (
              <article className='unit' key={`list${unit.id}`}>
                <h3>
                  {unit.models} {unit.name} - {unit.points}pts{' '}
                  <button onClick={() => handleRemove(unit, 'battleline')}>
                    Remove
                  </button>
                </h3>
                <p>Wargear: {unit.wargear}</p>
              </article>
            ))}
          <p>** Other **</p>
          {list.other &&
            list.other.map((unit) => (
              <article className='unit' key={`list${unit.id}`}>
                <h3>
                  {unit.models} {unit.name} - {unit.points}pts{' '}
                  <button onClick={() => handleRemove(unit, 'other')}>
                    Remove
                  </button>
                </h3>
                <p>Wargear: {unit.wargear}</p>
              </article>
            ))}
          <p>** Dedicated Transport **</p>
          {list.dedicatedTransport &&
            list.dedicatedTransport.map((unit) => (
              <article className='unit' key={`list${unit.id}`}>
                <h3>
                  {unit.models} {unit.name} - {unit.points}pts{' '}
                  <button
                    onClick={() => handleRemove(unit, 'dedicatedTransport')}
                  >
                    Remove
                  </button>
                </h3>
                <p>Wargear: {unit.wargear}</p>
              </article>
            ))}
        </section>)
}