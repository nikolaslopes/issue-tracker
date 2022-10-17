import { useMutation } from '@tanstack/react-query';
import { StatusSelect } from '../StatusSelect';

export const IssueStatus = () => {
  const statusMutation = useMutation();

  return (
    <div className="issue-options">
      <div>
        <span>Status</span>
        <StatusSelect />
      </div>
    </div>
  );
};
