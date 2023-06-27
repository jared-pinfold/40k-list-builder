import { useEffect, useState } from 'react'
import JsPDF from 'jspdf'
import { sortStr } from '../utils'
import { spaceMarinesData } from '../data/spaceMarines'
import { tyranidsData } from '../data/tyranids'
import { Unit, List } from '../models'

function App() {
  const emptyList: List = {
    characters: [],
    battleline: [],
    other: [],
    dedicatedTransport: [],
  } as List
  type Attribute = keyof List

  const [points, setPoints] = useState(0)
  const [pool, setPool] = useState(emptyList)
  const [list, setList] = useState(emptyList)
  const [form, setForm] = useState({ armyName: '', pointsLimit: 0 })

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

  function handleAdd(unit: Unit, category: Attribute) {
    setList({ ...list, [category]: [...list[category], unit].sort(sortStr) })
    setPool({
      ...pool,
      [category]: pool[category].filter(
        (currentUnit: Unit) => currentUnit !== unit
      ),
    })
  }

  function handleRemove(unit: Unit, category: Attribute) {
    setPool({ ...pool, [category]: [...pool[category], unit].sort(sortStr) })
    setList({
      ...list,
      [category]: list[category].filter(
        (currentUnit: Unit) => currentUnit !== unit
      ),
    })
  }

  function handleExport() {
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
    console.log(form)
  }

  function handleFaction(e: React.ChangeEvent<HTMLInputElement>) {
    switch (e.target.value) {
      case 'Space Marines':
        setPool(spaceMarinesData)
        setList(emptyList)
        break
      case 'Tyranids':
        setPool(tyranidsData)
        setList(emptyList)
        break
    }
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
        <label htmlFor="pointsLimit">Points limit * </label>
        <select id='pointsLimit' onChange={handleChange} name="pointsLimit">
          <option value="0">Choose a points limit</option>
          <option value="500">500</option>
          <option value="1000">1,000</option>
          <option value="2000">2,000</option>
          <option value="3000">3,000</option>
        </select>
        <label htmlFor="army-faction">Faction * </label>
        <select id="army-faction" onChange={handleFaction} name="faction">
          <option value="0">Choose a faction</option>
          <option value="Space Marines">Space Marines</option>
          <option value="Tyranids">Tyranids</option>
        </select>
      </form>
      <div className="container">
        <section className="column">
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
