import { useQuery } from '@tanstack/react-query';
import { defaultLabels } from './defaultData';

export interface ILabel {
  color: string;
  id: string;
  name: string;
}

export const useLabelsData = () => {
  async function fetchLabels(signal: AbortSignal | undefined) {
    const response = await fetch('/api/labels', { signal });
    const data: ILabel[] = await response.json();

    return data;
  }

  const labelsQuery = useQuery(
    ['labels'],
    ({ signal }) => fetchLabels(signal),
    {
      staleTime: 1000 * 60 * 60, // 1 hour
      placeholderData: defaultLabels,
    }
  );

  return labelsQuery;
};
