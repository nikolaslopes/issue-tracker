import { useLabelsData } from '../../../helpers/useLabelsData'

interface ILabel {
  label: string
}

export const Label = ({ label }: ILabel) => {
  const labelsQuery = useLabelsData()

  if (labelsQuery.isLoading) {
    return null
  }

  console.log(labelsQuery.data)

  return (
    <span key={label} className={`label red`}>
      {label}
    </span>
  )
}
