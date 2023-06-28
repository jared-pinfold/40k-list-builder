import { Unit, List, Form } from "../models"
import { sortStr } from "../utils"

type Attribute = keyof List
interface Props {
  form: Form
  setPool: React.Dispatch<React.SetStateAction<List>>
  setList: React.Dispatch<React.SetStateAction<List>>
  list: List
  pool: List
  points: number
}

export function Pool (props: Props) {

  const {form, setPool, setList, list, pool, points } = props

  function handleAdd(unit: Unit, category: Attribute) {
    setList({ ...list, [category]: [...list[category], unit].sort(sortStr) })
    setPool({
      ...pool,
      [category]: pool[category].filter(
        (currentUnit: Unit) => currentUnit !== unit
      ),
    })
  }

  return <section className="column">
  <h2>Unit Pool</h2>
  <p>** Characters **</p>
  {pool.characters.map((unit) => (
    <article className='unit' key={`pool${unit.id}`}>
      <h3
        style={
          points + unit.points > form.pointsLimit && form.pointsLimit
            ? { color: 'red' }
            : { color: 'black' }
        }
      >
        {unit.models} {unit.name} - {unit.points}pts{' '}
        <button onClick={() => handleAdd(unit, 'characters')}>
          Add
        </button>
      </h3>
      <p>Wargear: {unit.wargear}</p>
    </article>
  ))}
  <p>** Battleline **</p>
  {pool.battleline.map((unit) => (
    <article className='unit' key={`pool${unit.id}`}>
      <h3
        style={
          points + unit.points > form.pointsLimit && form.pointsLimit
            ? { color: 'red' }
            : { color: 'black' }
        }
      >
        {unit.models} {unit.name} - {unit.points}pts{' '}
        <button onClick={() => handleAdd(unit, 'battleline')}>
          Add
        </button>
      </h3>
      <p>Wargear: {unit.wargear}</p>
    </article>
  ))}
  <p>** Other **</p>
  {pool.other.map((unit) => (
    <article className='unit' key={`pool${unit.id}`}>
      <h3
        style={
          points + unit.points > form.pointsLimit && form.pointsLimit
            ? { color: 'red' }
            : { color: 'black' }
        }
      >
        {unit.models} {unit.name} - {unit.points}pts{' '}
        <button onClick={() => handleAdd(unit, 'other')}>Add</button>
      </h3>
      <p>Wargear: {unit.wargear}</p>
    </article>
  ))}
  <p>** Dedicated Transport **</p>
  {pool.dedicatedTransport.map((unit) => (
    <article className='unit' key={`pool${unit.id}`}>
      <h3
        style={
          points + unit.points > form.pointsLimit && form.pointsLimit
            ? { color: 'red' }
            : { color: 'black' }
        }
      >
        {unit.models} {unit.name} - {unit.points}pts{' '}
        <button onClick={() => handleAdd(unit, 'dedicatedTransport')}>
          Add
        </button>
      </h3>
      <p>Wargear: {unit.wargear}</p>
    </article>
  ))}
</section>
}