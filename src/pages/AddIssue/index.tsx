import { FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createIssue } from './services';
import { useNavigate } from 'react-router-dom';

export const AddIssue = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addIssueMutation = useMutation(createIssue, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['issues'], { exact: true });
      queryClient.setQueryData(['issues', String(data.number)], data);
      navigate(`/issue/${data.number}`);
    },
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (addIssueMutation.isLoading && !data.title && !data.comment) {
      return;
    }

    const payload = {
      title: String(data.title),
      comment: String(data.comment),
    };

    addIssueMutation.mutate(payload);
  }

  return (
    <div className="add-issue">
      <h2>Add Issue</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" placeholder="Title" />

        <label htmlFor="comment">Comment</label>
        <textarea id="comment" name="comment" placeholder="Comment" />

        <button type="submit" disabled={false}>
          {addIssueMutation.isLoading ? 'Adding Issue...' : 'Add Issue'}
        </button>
      </form>
    </div>
  );
};
