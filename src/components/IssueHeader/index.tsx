import { IssueProps } from '../../interfaces/global'

export type IssueHeaderProps = {
  issue: Omit<IssueProps, 'labels' | 'assignee' | 'id'>
}

export const IssueHeader = ({ issue }: IssueHeaderProps) => {
  console.log('issue', issue)

  return (
    <header>
      <h2>
        {issue.title} <span>#{issue.number}</span>
      </h2>
    </header>
  )
}
