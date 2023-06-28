import { spaceMarinesData } from '../data/spaceMarines'
import { tyranidsData } from '../data/tyranids'
import { List, Form } from '../models'
import { emptyList } from '../utils'


interface Props {
  form: Form
  setForm: React.Dispatch<React.SetStateAction<Form>> 
  setPool: React.Dispatch<React.SetStateAction<List>>
  setList: React.Dispatch<React.SetStateAction<List>>
}

export function FormComponent(props: Props) {

  const {form, setForm, setPool, setList} = props

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
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
      <select id="pointsLimit" onChange={handleChange} name="pointsLimit">
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
  )
}
