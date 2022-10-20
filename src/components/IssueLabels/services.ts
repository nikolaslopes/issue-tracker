import { IUpdateIssueLabels } from './types';

export const updateIssueLabels = async ({
  labels,
  issueNumber,
  labelId,
}: IUpdateIssueLabels) => {
  const newLabels = labels?.includes(labelId)
    ? labels.filter((label) => label !== labelId)
    : [...(labels !== undefined ? labels : []), labelId];

  const response = await fetch(`/api/issues/${issueNumber}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ labels: newLabels }),
  });

  const data = await response.json();

  return data;
};
