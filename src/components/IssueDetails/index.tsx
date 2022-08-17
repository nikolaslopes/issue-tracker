import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useIssueData } from '../../helpers/useIssueData'

export function IssueDetails() {
  const { number } = useParams()
  const issueQuery = useIssueData(number)

  console.log(issueQuery.data)

  return (
    <div className="issue-details">
      {issueQuery.isLoading ? <p>Loading issue...</p> : <h1>Issue {number}</h1>}
    </div>
  )
}
