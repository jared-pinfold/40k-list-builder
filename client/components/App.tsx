import { useEffect, useState } from 'react'
import { emptyList } from '../utils'
import { FormComponent } from './Form'
import { Pool } from './Pool'
import { ListComponent } from './List'

function App() {
  const [points, setPoints] = useState(0)
  const [pool, setPool] = useState(emptyList)
  const [list, setList] = useState(emptyList)
  const [form, setForm] = useState({ armyName: '', pointsLimit: 0 })
  const listProps = {
    list,
    setList,
    pool,
    setPool,
    form,
    points,
  }
  const formProps = {
    form,
    setForm,
    setPool,
    setList,
  }

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

  return (
    <div>
      <header>
        <h1>{`Jared's Warhammer 40k List builder`}</h1>
        <p>
          Click <b>add</b> to move a unit into the army list, and <b>remove</b>{' '}
          to move it back to the pool
        </p>
        <FormComponent {...formProps} />
      </header>
      <body>
        <div className="container">
          <Pool {...listProps} />
          <ListComponent {...listProps} />
        </div>
      </body>
    </div>
  )
}

export default App
