export interface IComment {
  id: string
  comment: string
  createdBy: string
  createdDate: string
}

export interface IssueProps {
  id: string
  title: string
  number: number
  status: string
  createdBy: string
  assignee: string
  createdDate: string
  comments: Array<IComment>
  labels: Array<string>
}

export type IssueItemFormatted = IssueProps & {
  commentsCounter: number
  formattedDate: string
}
