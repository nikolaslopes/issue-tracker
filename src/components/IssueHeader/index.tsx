import { GoIssueClosed, GoIssueOpened } from 'react-icons/go'
import { possibleStatus } from '../../helpers/defaultData'
import { IssueProps } from '../../interfaces/global'

export type IssueHeaderProps = Omit<IssueProps, 'labels' | 'assignee' | 'id'>

export const IssueHeader = ({
  title,
  status = 'todo',
  number,
  createdBy,
  createdDate,
  comments,
}: IssueHeaderProps) => {
  const statusObj = possibleStatus.find((item) => item.id === status)

  return (
    <header>
      <h2>
        {title} <span>#{number}</span>
      </h2>

      <div>
        <span
          className={
            status === 'done' || status === 'cancelled' ? 'closed' : 'open'
          }
        >
          {status === 'done' || status === 'cancelled' ? (
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
