import { IUpdateAssignmentIssue, IUsers } from './types';

export const updateAssignmentIssue = async ({
  assignee,
  issueNumber,
}: IUpdateAssignmentIssue) => {
  const response = await fetch(`/api/users/${assignee}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ assignee }),
  });

  const data = await response.json();

  return data;
};

export const fetchUsers = async () => {
  const response = await fetch('/api/users');
  const data: IUsers = await response.json();

  return data;
};
