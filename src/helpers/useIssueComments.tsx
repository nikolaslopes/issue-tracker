import { useQuery } from '@tanstack/react-query'
import { IComment, IComments } from '../interfaces/global'
import { relativeDate } from './relativeDate'

export const useIssueComments = (issueNumber: string | undefined) => {
  async function fetchComments() {
    const response = await fetch(`/api/issues/${issueNumber}/comments`)
    const data: IComment[] = await response.json()

    const comments: IComments[] = data.map((comment) => {
      return {
        ...comment,
        formattedDate: relativeDate(comment.createdDate),
      }
    })

    return comments
  }

  const commentsQuery = useQuery(
    ['issues', issueNumber, 'comments'],
    fetchComments
  )

  return commentsQuery
}
