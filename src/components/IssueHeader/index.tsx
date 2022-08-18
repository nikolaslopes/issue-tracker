import { GoIssueClosed, GoIssueOpened } from 'react-icons/go'
import { possibleStatus } from '../../helpers/defaultData'
import { IssueProps } from '../../interfaces/global'

export type IssueHeaderProps = {
  issue: Omit<IssueProps, 'labels' | 'assignee' | 'id'>
}

export const IssueHeader = ({ issue }: IssueHeaderProps) => {
  const statusObj = possibleStatus.find((status) => status.id === issue.status)

  return (
    <header>
      <h2>
        {issue.title} <span>#{issue.number}</span>
      </h2>

      <div>
        <span
          className={
            issue.status === 'done' || issue.status === 'cancelled'
              ? 'closed'
              : 'open'
          }
        >
          {issue.status === 'done' || issue.status === 'cancelled' ? (
            <GoIssueClosed />
          ) : (
            <GoIssueOpened />
          )}
          {statusObj?.label}
        </span>
      </div>
    </header>
  )
}
