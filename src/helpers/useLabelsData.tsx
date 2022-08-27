import { useQuery } from '@tanstack/react-query'

export interface ILabel {
  color: string
  id: string
  name: string
}

export const useLabelsData = (signal: AbortSignal | undefined) => {
  async function fetchLabels() {
    const response = await fetch('/api/labels', { signal })
    const data: ILabel[] = await response.json()

    return data
  }

  const labelsQuery = useQuery(['labels'], ({ signal }) => fetchLabels, {
    staleTime: 1000 * 60 * 60, // 1 hour
  })

  return labelsQuery
}
