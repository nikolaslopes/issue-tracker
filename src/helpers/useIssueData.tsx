import { useQuery } from '@tanstack/react-query'
import { IssueItemFormatted, IssueProps } from '../interfaces/global'
import { relativeDate } from './relativeDate'

export const useIssueData = (issueNumber: string | undefined) => {
  async function fetchIssue(signal: AbortSignal | undefined) {
    const response = await fetch(`/api/issues/${issueNumber}`, { signal })
    const data: IssueProps = await response.json()

    const issueList: IssueItemFormatted = {
      ...data,
      status: data.status ? data.status : 'todo',
      formattedDate: relativeDate(data.createdDate),
      commentsCounter: data.comments.length,
    }

    return issueList
  }

  const issueQuery = useQuery(['issue', issueNumber], ({ signal }) =>
    fetchIssue(signal)
  )
  return issueQuery
}
