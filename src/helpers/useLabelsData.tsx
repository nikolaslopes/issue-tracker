import { useQuery } from '@tanstack/react-query'

export const useLabelsData = () => {
  async function fetchLabels() {
    const response = await fetch('api/labels')
    const data = response.json()

    return data
  }

  const labelsQuery = useQuery(['lables'], fetchLabels)
  return labelsQuery
}
