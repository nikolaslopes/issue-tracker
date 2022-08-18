import { useQuery } from '@tanstack/react-query'
import { IComment, IssueProps } from '../interfaces/global'

export const useIssueComments = (issueNumber: string | undefined) => {
  async function fetchComments() {
    const response = await fetch(`/api/issues/${issueNumber}/comments`)
    const data: IComment[] = await response.json()

    return data
  }

  const commentsQuery = useQuery(
    ['issues', issueNumber, 'comments'],
    fetchComments
  )

  return commentsQuery
}
