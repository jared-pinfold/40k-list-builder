import { useEffect, useState } from 'react'
import { spaceMarinesData } from '../spaceMarines'
import { Unit } from '../models'
import JsPDF from 'jspdf'

function App() {
  const [points, setPoints] = useState(0)
  const [pool, setPool] = useState(spaceMarinesData)
  const [list, setList] = useState([] as Unit[])
  const [form, setForm] = useState({ armyName: '', pointsLimit: 0 })

  useEffect(() => {
    setPoints(list.reduce((a, c) => a + c.points, 0))
  }, [pool, list])

  function handleAdd(unit: Unit) {
    setList([...list, unit])
    setPool(pool.filter((currentUnit: Unit) => currentUnit !== unit))
  }

  function handleRemove(unit: Unit) {
    setPool([...pool, unit])
    setList(list.filter((currentUnit: Unit) => currentUnit !== unit))
  }

  function handleExport() {
    const ExportList = new JsPDF()
    let yCoord = 20
    ExportList.setFontSize(20)
    ExportList.text(
      20,
      yCoord,
      `${form.armyName} - ${points}pts`
    )
    yCoord += 10
    list.map((unit) => {
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
      console.log("map ", unit.name, ' ', yCoord)
      yCoord += 10
    })
    ExportList.save(`${form.armyName.replace(/ /gi, '_')}.pdf`)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
    console.log(form)
  }

  return (
    <div>
      <h1>{`Jared's Warhammer 40k List builder`}</h1>
      <p>
        Click <b>add</b> to move a unit into the army list, and <b>remove</b> to
        move it back to the pool
      </p>
      <form>
        <label htmlFor="army-name">Army name * </label>
        <input
          onChange={handleChange}
          type="text"
          id="army-name"
          name="armyName"
          value={form.armyName}
          required
        ></input>
        <label htmlFor="army-name">Points limit * </label>
        <select onChange={handleChange} name="pointsLimit">
          <option value="0">Choose a points limit</option>
          <option value="500">500</option>
          <option value="1000">1,000</option>
          <option value="2000">2,000</option>
          <option value="3000">3,000</option>
        </select>
      </form>
      <div className="container">
        <section className="column">
          <h2>Pool</h2>

          {pool.map((unit) => (
            <article key={`pool${unit.id}`}>
              <h3
                style={
                  points + unit.points > form.pointsLimit && form.pointsLimit
                    ? { color: 'red' }
                    : { color: 'black' }
                }
              >
                {unit.models} {unit.name} - {unit.points}pts{' '}
                <button onClick={() => handleAdd(unit)}>Add</button>
              </h3>
              <p>Wargear: {unit.wargear}</p>
            </article>
          ))}
        </section>
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
            <button onClick={handleExport}>Export</button>
          </h2>

          {list ? (
            list.map((unit) => (
              <article key={`list${unit.id}`}>
                <h3>
                  {unit.models} {unit.name} - {unit.points}pts{' '}
                  <button onClick={() => handleRemove(unit)}>Remove</button>
                </h3>
                <p>Wargear: {unit.wargear}</p>
              </article>
            ))
          ) : (
            <div></div>
          )}
        </section>
      </div>
    </div>
  )
}

export default App
