import { ILabel, useLabelsData } from '../../helpers/useLabelsData'

interface ILabelList {
  selected: ILabel[]
  toggle: (label: ILabel) => void
}

export function LabelList({ selected, toggle }: ILabelList) {
  const labelsQuery = useLabelsData()

  return (
    <div className="labels">
      <h3>Labels</h3>
      {labelsQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {labelsQuery.data?.map((label) => (
            <li key={label.id}>
              <button
                onClick={() => toggle(label)}
                className={`label ${
                  selected.includes(label) ? 'selected' : ''
                } ${label.color}`}
              >
                {label.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
