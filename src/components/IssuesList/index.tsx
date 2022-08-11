import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { IssueProps, IssuesProps } from '../../interfaces/global'

export async function fetchIssuesList() {
  const response = await fetch('/api/issues')
  const data = await response.json()

  return data as IssuesProps
}

export function IssuesList() {
  const issuesQuery = useQuery<IssuesProps>(['issues'], () => fetchIssuesList())

  console.log('data', issuesQuery.data)
  return (
    <div>
      <h2>Issues List</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {issuesQuery.data?.issues.map((issue) => (
            <p>{issue.title}</p>
          ))}
        </>
      )}
    </div>
  )
}
