import { useLabelsData } from '../../../helpers/useLabelsData'

interface ILabel {
  labelId: string
}

export const Label = ({ labelId }: ILabel) => {
  const labelsQuery = useLabelsData()

  if (labelsQuery.isLoading) {
    return null
  }

  const labelObj = labelsQuery.data?.find((item) => item.id === labelId)

  if (!labelObj) {
    return null
  }

  return <span className={`label ${labelObj?.color}`}>{labelObj?.name}</span>
}
