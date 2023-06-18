import { useState } from "react"
import { data, Unit } from "../data"

function App() {
  const [points, setPoints] = useState(0)
  const [pool, setPool] = useState(data)
  const [list, setList] = useState([] as Unit[])

  return (
    <div>
      <h1>{`Jared's Warhammer 40k List builder`}</h1>
      <p>Click add to move a unit into the army list, and remove to move it back to the pool</p>
      <div className="container">
        <section className="column">
          <h2>Pool</h2>
          <ul>
            {pool.map(unit => <li key={unit.id}>
              <h3>{unit.name} - {unit.points}pts</h3>
              <p>
                Models: {unit.models}
                Wargear: {unit.wargear}
                </p>
            </li>)}
          </ul>
        </section>
        <section className="column">
          <h2>Army - {points} points</h2>
        </section>
      </div>
    
    </div>
  )
}

export default App
