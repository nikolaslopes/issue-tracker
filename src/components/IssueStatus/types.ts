export type IssueStatusProps = {
  status: string | undefined;
  issueNumber: string;
};

export interface IUpdateIssueStatus extends IssueStatusProps {}
