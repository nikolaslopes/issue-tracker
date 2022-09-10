import { useQueryClient } from '@tanstack/react-query'
import { GoIssueOpened, GoIssueClosed, GoComment } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { fetchComments } from '../../../helpers/useIssueComments'
import { fetchIssue } from '../../../helpers/useIssueData'
import { useUserData } from '../../../helpers/useUserData'
import { IssueItemProps } from '../types'
import { Label } from './Label'

export function IssueItem({ issue }: IssueItemProps) {
  const queryClient = useQueryClient()
  const assigneeUser = useUserData(issue.assignee)
  const createdByUser = useUserData(issue.createdBy)

  return (
    <li
      onMouseEnter={() => {
        queryClient.prefetchQuery(
          ['issues', String(issue.number)],
          ({ signal }) => fetchIssue(signal, String(issue.number))
        )
        queryClient.prefetchQuery(
          ['issues', String(issue.number), 'comments'],
          ({ signal }) => fetchComments(signal, String(issue.number))
        )
      }}
    >
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
            <Label key={label} labelId={label} />
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
