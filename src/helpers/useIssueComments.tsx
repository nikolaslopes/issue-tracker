import { useQuery } from '@tanstack/react-query'
import { IComment, IComments } from '../types/global'
import { relativeDate } from './relativeDate'

export async function fetchComments(
  signal: AbortSignal | undefined,
  issueNumber: string | undefined
) {
  const response = await fetch(`/api/issues/${issueNumber}/comments`, {
    signal,
  })
  const data: IComment[] = await response.json()

  const comments: IComments[] = data.map((comment) => {
    return {
      ...comment,
      formattedDate: relativeDate(comment.createdDate),
    }
  })

  return comments
}

export const useIssueComments = (issueNumber: string | undefined) => {
  const commentsQuery = useQuery(
    ['issues', issueNumber, 'comments'],
    ({ signal }) => fetchComments(signal, issueNumber)
  )

  return commentsQuery
}
