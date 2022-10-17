import { useMutation } from '@tanstack/react-query';
import { StatusSelect } from '../StatusSelect';
import { IIssueStatus } from './types';

export const IssueStatus = ({ status, issueNumber }: IIssueStatus) => {
  // const statusMutation = useMutation();

  return (
    <div className="issue-options">
      <div>
        <span>Status</span>
        <StatusSelect noEmptyOption value={status} onChange={() => {}} />
      </div>
    </div>
  );
};
