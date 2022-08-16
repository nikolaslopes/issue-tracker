import { GoIssueOpened, GoIssueClosed, GoComment } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { useUserData } from '../../../helpers/useUserData'
import { IssueItemProps } from '../types'

export function IssueItem({ issue }: IssueItemProps) {
  const assigneeUser = useUserData(issue.assignee)
  const createdByUser = useUserData(issue.createdBy)

  console.log(assigneeUser.data)

  return (
    <li>
      <div>
        {issue.status === 'done' || issue.status === 'cancelled' ? (
          <GoIssueClosed style={{ color: 'red' }} />
        ) : (
          <GoIssueOpened style={{ color: 'green' }} />
        )}
      </div>
      <div className="issue-content">
        <span>
          <Link to={`/issue/${issue.number}`}>{issue.title}</Link>
          {issue.labels.map((label) => (
            <span key={label} className={`label red`}>
              {label}
            </span>
          ))}
        </span>
        <small>
          #{issue.number} opened {issue.formattedDate}{' '}
          {createdByUser.isSuccess ? `by ${createdByUser.data.name}` : ''}
        </small>
      </div>
      {issue.assignee ? (
        <img
          className="assigned-to"
          src={
            assigneeUser.isSuccess ? assigneeUser.data?.profilePictureUrl : ''
          }
          alt={`Assigned to ${
            assigneeUser.isSuccess
              ? assigneeUser.data?.name
              : 'user name not found'
          }`}
        />
      ) : null}
      <span className={'comment-count'}>
        {issue.commentsCounter > 0 ? (
          <>
            <GoComment />
            {issue.commentsCounter}
          </>
        ) : null}
      </span>
    </li>
  )
}
