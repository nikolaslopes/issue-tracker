import { useQuery } from '@tanstack/react-query'
import { fetchIssuesList } from './services'
import { IssueItem } from './components/IssueItem'
import { ILabelList } from '../LabelList'

export type IIssuesList = Pick<ILabelList, 'selectedLabels'> & {
  status: string
}

export function IssuesList({ selectedLabels, status }: IIssuesList) {
  const labelsString = selectedLabels
    .map((label) => {
      return `labels[]=${label.id}`
    })
    .join('&')

  const statusString = status ? `&status=${status}` : ''

  const issuesQuery = useQuery(['issues', { selectedLabels, status }], () =>
    fetchIssuesList({ labelsParam: labelsString, statusParam: statusString })
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
