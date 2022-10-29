import { IUpdateIssueLabels } from './types';

export const updateIssueLabels = async ({
  labels,
  issueNumber,
  labelId,
}: IUpdateIssueLabels) => {
  const newLabels = labels?.includes(labelId)
    ? labels.filter((label) => label !== labelId)
    : [...(labels !== undefined ? labels : []), labelId];

  return fetch(`/api/issues/${issueNumber}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ labels: newLabels }),
  }).then((res) => res.json());
};
