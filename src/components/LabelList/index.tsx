import { useLabelsData } from '../../helpers/useLabelsData'

export function LabelList() {
  const labelsQuery = useLabelsData()

  console.log(labelsQuery.data)
  return (
    <div>
      <h3>Labels</h3>
      {labelsQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {labelsQuery.data?.map((label) => (
            <li key={label.id}>
              <button className={`${label.color}`}>{label.name}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
