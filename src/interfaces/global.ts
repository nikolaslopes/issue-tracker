export interface IssueProps {
  assignee: string
  comments: Array<string>
  completedDate: any
  createdBy: string
  createdDate: string
  dueDate: any
  id: string
  labels: Array<string>
  number: number
  status: string
  title: string
}

export interface IssueItemProps {
  issue: Pick<
    IssueProps,
    | 'title'
    | 'number'
    | 'assignee'
    | 'comments'
    | 'createdBy'
    | 'createdDate'
    | 'labels'
    | 'status'
  >
}
