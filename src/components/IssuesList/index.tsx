import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

export function IssuesList() {
  const issuesQuery = useQuery(['issues'], () =>
    fetch('/api/issues').then((response) =>
      response.json().then((data) => console.log(data))
    )
  )
  return (
    <div>
      <h1>Issues List</h1>
      <ul>
        <li>
          <Link to="/issue/1">Issue 1</Link>
        </li>
      </ul>
    </div>
  )
}
