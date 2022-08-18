import { useQuery } from '@tanstack/react-query'
import { IssueProps } from '../interfaces/global'

type UseIssueCommentsProps = Pick<IssueProps, 'comments'>

export const useIssueComments = (issueNumber: string | undefined) => {
  async function fetchComments() {
    const response = await fetch(`/api/issues/${issueNumber}/comments`)
    const data: UseIssueCommentsProps = await response.json()

    return data
  }

  const commentsQuery = useQuery(
    ['issues', issueNumber, 'comments'],
    fetchComments
  )

  return commentsQuery
}
