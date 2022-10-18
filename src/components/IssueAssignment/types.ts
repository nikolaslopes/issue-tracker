export type IssueAssignmentProps = {
  assignee?: string;
  issueNumber: string;
};

export interface IUpdateAssignmentIssue extends IssueAssignmentProps {}

export interface IUser {
  id: string;
  name: string;
  profilePictureUrl: string;
}

export type IUsers = IUser[];
