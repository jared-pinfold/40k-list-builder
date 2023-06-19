import { useEffect, useState } from 'react'
import { data, Unit } from '../data'

function App() {
  const [points, setPoints] = useState(0)
  const [pool, setPool] = useState(data)
  const [list, setList] = useState([] as Unit[])

  useEffect(() => {
    setPoints(list.reduce((a,c) => a + c.points, 0))
  }, [pool, list])

  function handleAdd(unit: Unit) {
    setList([...list, unit])
    setPool(pool.filter(currentUnit => currentUnit !== unit))
  }

  function handleRemove(unit: Unit) {
    setPool([...pool, unit])
    setList(list.filter(currentUnit => currentUnit !== unit))
  }

  return (
    <div>
      <h1>{`Jared's Warhammer 40k List builder`}</h1>
      <p>
        Click <b>add</b> to move a unit into the army list, and <b>remove</b> to
        move it back to the pool
      </p>
      <div className="container">
        <section className="column">
          <h2>Pool</h2>

          {pool.map((unit) => (
            <article key={`pool${unit.id}`}>
              <h3>
                {unit.models} {unit.name} - {unit.points}pts{' '}
                <button onClick={() =>handleAdd(unit)}>Add</button>
              </h3>
              <p>
                Wargear: {unit.wargear}
              </p>
            </article>
          ))}
        </section>
        <section className="column">
          <h2>Army - {points} points <button>Export</button></h2>

          {list.map((unit) => (
            <article key={`list${unit.id}`}>
              <h3>
              {unit.models} {unit.name} - {unit.points}pts{' '}
                <button onClick={() => handleRemove(unit)}>Remove</button>
              </h3>
              <p>
                Wargear: {unit.wargear}
              </p>
            </article>
          ))}
        </section>
      </div>
    </div>
  )
}

export default App
