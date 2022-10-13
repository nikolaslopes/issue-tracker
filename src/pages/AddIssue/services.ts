export type IssueCreateFormData = {
  title: string;
  comment: string;
};

export const createIssue = async ({ title, comment }: IssueCreateFormData) => {
  const response = await fetch('/api/issues', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title,
      comment,
    }),
  });

  const data = await response.json();

  return data;
};
