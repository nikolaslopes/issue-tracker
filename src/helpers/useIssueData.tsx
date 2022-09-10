import { useQuery } from '@tanstack/react-query'
import { IssueItemFormatted, IssueProps } from '../types/global'
import { relativeDate } from './relativeDate'

export async function fetchIssue(
  signal: AbortSignal | undefined | null,
  issueNumber: string | undefined
) {
  const response = await fetch(`/api/issues/${issueNumber}`, { signal })
  const data: IssueProps = await response.json()

  const issueList: IssueItemFormatted = {
    ...data,
    status: data.status ? data.status : 'todo',
    commentsCounter: data.comments.length,
    formattedDate: relativeDate(data.createdDate),
  }

  return issueList
}

export const useIssueData = (issueNumber: string | undefined) => {
  const issueQuery = useQuery(['issues', issueNumber], ({ signal }) =>
    fetchIssue(signal, issueNumber)
  )
  return issueQuery
}
