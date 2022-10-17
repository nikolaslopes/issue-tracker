import { useMutation } from '@tanstack/react-query';
import { ChangeEvent } from 'react';
import { StatusSelect } from '../StatusSelect';
import { updateIssueStatus } from './services';
import { IssueStatusProps } from './types';

export const IssueStatus = ({ status, issueNumber }: IssueStatusProps) => {
  const updateIssueStatusMutation = useMutation(updateIssueStatus, {});

  function onUpdateIssueStatus(event: ChangeEvent<HTMLSelectElement>) {
    updateIssueStatusMutation.mutate({
      status: event.target.value,
      issueNumber,
    });
    console.log(event.target.value);
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
