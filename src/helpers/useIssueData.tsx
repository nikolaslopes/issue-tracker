import { useQuery } from '@tanstack/react-query'
import { IssueItemFormatted, IssueProps } from '../interfaces/global'
import { relativeDate } from './relativeDate'

export const useIssueData = (issueNumber: string | undefined) => {
  async function fetchIssue() {
    const response = await fetch(`/api/issues/${issueNumber}`)
    const data: IssueProps = await response.json()

    const issueList: IssueItemFormatted = {
      ...data,
      status: data.status ? data.status : 'todo',
      formattedDate: relativeDate(data.createdDate),
      commentsCounter: data.comments.length,
    }

    return issueList
  }

  const issueQuery = useQuery(['issue', issueNumber], fetchIssue)
  return issueQuery
}
