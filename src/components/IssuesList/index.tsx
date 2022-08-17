import { useQuery } from '@tanstack/react-query'
import { fetchIssuesList } from './services'
import { IssueItem } from './components/IssueItem'
import { ILabelList } from '../LabelList'

export type IIssuesList = Pick<ILabelList, 'selectedLabels'>

export function IssuesList({ selectedLabels }: IIssuesList) {
  const labelsQueryString = selectedLabels
    .map((label) => {
      return `labels[]=${label.name}`
    })
    .join('&')

  const issuesQuery = useQuery(['issues', { selectedLabels }], () =>
    fetchIssuesList(labelsQueryString)
  )

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
