import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

export interface IssueProps {
  assignee: string
  comments: Array<string>
  completedDate: any
  createdBy: string
  createdDate: string
  dueDate: any
  id: string
  labels: Array<string>
  number: number
  status: string
  title: string
}

export async function fetchIssuesList() {
  const response = await fetch('/api/issues')
  const data = await response.json()

  console.log(data)

  return data as IssueProps[]
}

export function IssuesList() {
  const issuesQuery = useQuery<IssueProps[]>(['issues'], () =>
    fetchIssuesList()
  )

  return (
    <div>
      <h2>Issues List</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {issuesQuery.data?.map((issue) => (
            <li>
              <Link to="/issue/1">Issue {issue.number}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
