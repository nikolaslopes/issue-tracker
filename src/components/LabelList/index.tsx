import { ILabel, useLabelsData } from '../../helpers/useLabelsData'

export interface ILabelList {
  selectedLabels: ILabel[]
  toggle: (label: ILabel) => void
}

export function LabelList({ selectedLabels, toggle }: ILabelList) {
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
                  selectedLabels.includes(label) ? 'selected' : ''
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
