import { relativeDate } from '../../../../helpers/relativeDate'
import { GoIssueOpened, GoIssueClosed, GoComment } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { IssueItemProps } from './types'

export function IssueItem({ issue }: IssueItemProps) {
  console.log('data', issue)

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
          #{issue.number} opened {issue.formattedDate} by {issue.createdBy}
        </small>
      </div>
      {issue.assignee ? <div>{issue.assignee}</div> : null}

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
