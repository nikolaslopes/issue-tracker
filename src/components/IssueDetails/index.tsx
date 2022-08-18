import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useIssueData } from '../../helpers/useIssueData'
import { IssueHeader } from '../IssueHeader'

export function IssueDetails() {
  const { number } = useParams()
  const issueQuery = useIssueData(number)

  console.log(issueQuery.data)

  return (
    <div className="issue-details">
      {issueQuery.isLoading ? (
        <p>Loading issue...</p>
      ) : (
        <>
          <IssueHeader issue={issueQuery?.data} />
        </>
      )}
    </div>
  )
}
