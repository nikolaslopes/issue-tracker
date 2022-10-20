import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent } from 'react';
import { StatusSelect } from '../StatusSelect';
import { updateIssueStatus } from './services';
import { IssueStatusProps } from './types';

export const IssueStatus = ({ status, issueNumber }: IssueStatusProps) => {
  const queryClient = useQueryClient();
  const updateIssueStatusMutation = useMutation(updateIssueStatus, {
    onMutate: (variables) => {
      const savedCache = queryClient.getQueryData<IssueStatusProps>([
        'issues',
        issueNumber,
      ]);

      queryClient.setQueryData(['issues', issueNumber], {
        ...savedCache,
        status: variables.status,
      });

      function rollback() {
        queryClient.setQueryData(['issues', issueNumber], {
          ...savedCache,
        });
      }

      return () => rollback();
    },
    onError: (error, variables, rollback) => {
      rollback?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries(['issues', issueNumber], {
        exact: true,
      });
    },
  });

  function onUpdateIssueStatus(event: ChangeEvent<HTMLSelectElement>) {
    updateIssueStatusMutation.mutate({
      status: event.target.value,
      issueNumber,
    });
  }

  return (
    <div className="issue-options">
      <div>
        <span>Status</span>
        <StatusSelect
          noEmptyOption
          value={status}
          onChange={onUpdateIssueStatus}
        />
      </div>
    </div>
  );
};
