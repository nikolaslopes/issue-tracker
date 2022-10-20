export type IssueLabelProps = {
  labels: string[] | undefined;
  issueNumber: string;
};

export interface IUpdateIssueLabels extends IssueLabelProps {
  labelId: string;
}
