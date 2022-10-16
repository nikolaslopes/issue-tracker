import { StatusSelect } from '../StatusSelect';

export const IssueStatus = () => {
  return (
    <div className="issue-options">
      <div>
        <span>Status</span>
        <StatusSelect />
      </div>
    </div>
  );
};
