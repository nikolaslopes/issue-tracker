import { useQuery } from '@tanstack/react-query'

export const useIssueComments = (issueNumber: string | undefined) => {
  async function fetchComments() {
    const response = await fetch(`/api/issues/${issueNumber}/comments`)
    const data = response.json()

    return data
  }

  const commentsQuery = useQuery(
    ['issues', issueNumber, 'comments'],
    fetchComments
  )
}
