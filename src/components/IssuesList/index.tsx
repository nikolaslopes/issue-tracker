import { useQuery } from '@tanstack/react-query'
import { IssueProps } from '../../interfaces/global'
import { fetchIssuesList } from './services'

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
        <>
          {issuesQuery.data?.map((issue) => (
            <p>{issue.title}</p>
          ))}
        </>
      )}
    </div>
  )
}
