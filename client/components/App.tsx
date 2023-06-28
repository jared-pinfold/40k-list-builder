import { useEffect, useState } from 'react'
import { sortStr, exportPDF, emptyList } from '../utils'
import { Unit, List } from '../models'
import { FormComponent } from './Form'
import { Pool } from './Pool'

function App() {

  const [points, setPoints] = useState(0)
  const [pool, setPool] = useState(emptyList)
  const [list, setList] = useState(emptyList)
  const [form, setForm] = useState({ armyName: '', pointsLimit: 0 })

  type Attribute = keyof List

  useEffect(() => {
    setPoints(
      [
        ...list.characters,
        ...list.battleline,
        ...list.other,
        ...list.dedicatedTransport,
      ].reduce((a, c) => a + c.points, 0)
    )
  }, [pool, list])

  // function handleAdd(unit: Unit, category: Attribute) {
  //   setList({ ...list, [category]: [...list[category], unit].sort(sortStr) })
  //   setPool({
  //     ...pool,
  //     [category]: pool[category].filter(
  //       (currentUnit: Unit) => currentUnit !== unit
  //     ),
  //   })
  // }

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
    <div>
      <h1>{`Jared's Warhammer 40k List builder`}</h1>
      <p>
        Click <b>add</b> to move a unit into the army list, and <b>remove</b> to
        move it back to the pool
      </p>
      <FormComponent {...{
        form, setForm, setPool, setList
      }}/>
      
      <div className="container">
        <Pool {...{
          list, setList, pool, setPool, form, points
        }}/>
        {/* <section className="column">
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
        </section> */}


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
        </section>
      </div>
    </div>
  )
}

export default App
