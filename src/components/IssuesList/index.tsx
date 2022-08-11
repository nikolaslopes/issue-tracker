import { useQuery } from '@tanstack/react-query'
import { IssueItemProps, IssueProps } from '../../interfaces/global'
import { relativeDate } from '../../helpers/relativeDate'
import { fetchIssuesList } from './services'
import { GoIssueOpened, GoIssueClosed, GoComment } from 'react-icons/go'
import { Link } from 'react-router-dom'

export function IssueItem({ issue }: IssueItemProps) {
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
          #{issue.number} opened {relativeDate(issue.createdDate)} by{' '}
          {issue.createdBy}
        </small>
      </div>
      {issue.assignee ? <div>{issue.assignee}</div> : null}

      <span className={'comment-count'}>
        {issue.comments.length > 0 ? (
          <>
            <GoComment />
            {issue.comments.length}
          </>
        ) : null}
      </span>
    </li>
  )
}

export function IssuesList() {
  const issuesQuery = useQuery<IssueProps[]>(['issues'], () =>
    fetchIssuesList()
  )

  console.log('data', issuesQuery.data)
  return (
    <div>
      <h2>Issues List</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className={'issues-list'}>
          {issuesQuery.data?.map((issue) => (
            <IssueItem key={issue.id} issue={issue} />
          ))}
        </ul>
      )}
    </div>
  )
}
