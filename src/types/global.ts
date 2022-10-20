export interface IComment {
  id: string;
  comment: string;
  createdBy: string;
  createdDate: string;
}

export type IComments = Omit<IComment, 'createdDate'> & {
  formattedDate: string;
};

export interface IssueProps {
  id: string;
  title: string;
  number: number;
  status: string;
  createdBy: string;
  assignee: string;
  createdDate: string;
  comments: Array<IComment>;
  labels: string[];
}

export type IssueItemFormatted = IssueProps & {
  commentsCounter: number;
  formattedDate: string;
};

export type IIssuesSearchResults = {
  count: number;
  items: Array<IssueProps>;
};

export type IIssuesSearchResultsFormatted = {
  count: number;
  items: Array<
    IssueProps & {
      commentsCounter: number;
      formattedDate: string;
    }
  >;
};
