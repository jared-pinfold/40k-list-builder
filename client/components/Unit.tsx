import { Unit, Attribute } from '../models'

interface Props {
  unit: Unit
  cb: (unit: Unit, category: Attribute) => void
  category: Attribute
  buttonText: string
  style: {color: string}
}

export function UnitComponent(props: Props) {
  const { unit, cb, category, buttonText, style } = props
  return (
    <article className="unit" key={`list${unit.id}`}>
      <h3 style={style}>
        {unit.models} {unit.name} - {unit.points}pts{' '}
        <button onClick={() => cb(unit, category)}>{buttonText}</button>
      </h3>
      <p>Wargear: {unit.wargear}</p>
    </article>
  )
}
