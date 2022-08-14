export interface IssueProps {
  id: string
  title: string
  number: number
  status: string
  createdBy: string
  assignee: string
  createdDate: string
  comments: Array<string>
  labels: Array<string>
}

export type IssueItemFormatted = IssueProps & {
  commentsCounter: number
  formattedDate: string
}
