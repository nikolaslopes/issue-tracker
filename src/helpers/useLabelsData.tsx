import { useQuery } from '@tanstack/react-query'

export interface ILabel {
  color: string
  id: string
  name: string
}

export const useLabelsData = () => {
  async function fetchLabels() {
    const response = await fetch('/api/labels')
    const data: ILabel[] = await response.json()

    return data
  }

  const labelsQuery = useQuery(['labels'], fetchLabels, {
    staleTime: 1000 * 60 * 60, // 1 hour
  })

  return labelsQuery
}
