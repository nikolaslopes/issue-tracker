import { IUpdateIssueStatus } from './types';

export const updateIssueStatus = async ({
  status,
  issueNumber,
}: IUpdateIssueStatus) => {
  const response = await fetch(`/api/issues/${issueNumber}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  const data = await response.json();

  return data;
};
