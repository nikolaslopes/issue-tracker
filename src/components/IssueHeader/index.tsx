import { GoIssueClosed, GoIssueOpened } from 'react-icons/go'
import { possibleStatus } from '../../helpers/defaultData'
import { useUserData } from '../../helpers/useUserData'
import { IssueHeaderProps } from './types'

export const IssueHeader = ({ issue }: IssueHeaderProps) => {
  const statusObj = possibleStatus.find((item) => item.id === issue?.status)

  const createdUser = useUserData(issue?.createdBy)

  return (
    <header>
      <h2>
        {issue?.title} <span>#{issue?.number}</span>
      </h2>

      <div>
        <span
          className={
            issue?.status === 'done' || issue?.status === 'cancelled'
              ? 'closed'
              : 'open'
          }
        >
          {issue?.status === 'done' || issue?.status === 'cancelled' ? (
            <GoIssueClosed />
          ) : (
            <GoIssueOpened />
          )}
          {statusObj?.label}
        </span>
        <span className="created-by">
          {createdUser.isLoading ? '...' : createdUser.data?.name}
        </span>
        opened this issue {issue?.formattedDate} - {issue?.commentsCounter}{' '}
        comments
      </div>
    </header>
  )
}
