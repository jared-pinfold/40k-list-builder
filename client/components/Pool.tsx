import { Unit, List, Form, Attribute } from '../models'
import { sortStr } from '../utils'
import { UnitComponent } from './Unit'

interface Props {
  form: Form
  setPool: React.Dispatch<React.SetStateAction<List>>
  setList: React.Dispatch<React.SetStateAction<List>>
  list: List
  pool: List
  points: number
}

export function Pool(props: Props) {
  const { form, setPool, setList, list, pool, points } = props

  function handleAdd(unit: Unit, category: Attribute) {
    setList({ ...list, [category]: [...list[category], unit].sort(sortStr) })
    setPool({
      ...pool,
      [category]: pool[category].filter(
        (currentUnit: Unit) => currentUnit !== unit
      ),
    })
  }

  return (
    <section className="column">
      <h2>Unit Pool</h2>
      <p>** Characters **</p>

      {pool.characters &&
        pool.characters.map((unit) => (
          <UnitComponent
            className="unit"
            key={`list${unit.id}`}
            {...{
              unit,
              cb: handleAdd,
              category: 'characters',
              buttonText: 'Add',
              style:
                points + unit.points > form.pointsLimit && form.pointsLimit
                  ? { color: 'red' }
                  : { color: 'black' },
            }}
          />
        ))}

      <p>** Battleline **</p>
      {pool.battleline &&
        pool.battleline.map((unit) => (
          <UnitComponent
            className="unit"
            key={`list${unit.id}`}
            {...{
              unit,
              cb: handleAdd,
              category: 'battleline',
              buttonText: 'Add',
              style:
                points + unit.points > form.pointsLimit && form.pointsLimit
                  ? { color: 'red' }
                  : { color: 'black' },
            }}
          />
        ))}

      <p>** Other **</p>

      {pool.other &&
        pool.other.map((unit) => (
          <UnitComponent
            className="unit"
            key={`list${unit.id}`}
            {...{
              unit,
              cb: handleAdd,
              category: 'other',
              buttonText: 'Add',
              style:
                points + unit.points > form.pointsLimit && form.pointsLimit
                  ? { color: 'red' }
                  : { color: 'black' },
            }}
          />
        ))}

      <p>** Dedicated Transport **</p>

      {pool.dedicatedTransport &&
        pool.dedicatedTransport.map((unit) => (
          <UnitComponent
            className="unit"
            key={`list${unit.id}`}
            {...{
              unit,
              cb: handleAdd,
              category: 'dedicatedTransport',
              buttonText: 'Add',
              style:
                points + unit.points > form.pointsLimit && form.pointsLimit
                  ? { color: 'red' }
                  : { color: 'black' },
            }}
          />
        ))}
    </section>
  )
}
