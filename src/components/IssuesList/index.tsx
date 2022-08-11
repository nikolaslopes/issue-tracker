import { useQuery } from '@tanstack/react-query'
import { IssueProps } from '../../interfaces/global'
import { fetchIssuesList } from './services'
import { IssueItem } from './components/IssueItem'

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
