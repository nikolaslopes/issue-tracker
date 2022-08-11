import {
  Link,
  Route,
  Routes as RoutesWrapper,
  useMatch,
} from 'react-router-dom'
import { AddIssue } from '../pages/AddIssue'
import { Issue } from '../pages/Issue'
import { Issues } from '../pages/Issues'

export function Routes() {
  const isRootPath = useMatch({ path: '/', end: true })

  return (
    <div className="App">
      {!isRootPath ? (
        <Link to="/">Back to Issues List</Link>
      ) : (
        <span>&nbsp;</span>
      )}
      <h1>Issue Tracker</h1>

      <RoutesWrapper>
        <Route path="/" element={<Issues />} />
        <Route path="/add" element={<AddIssue />} />
        <Route path="/issue/:number" element={<Issue />} />
      </RoutesWrapper>
    </div>
  )
}
