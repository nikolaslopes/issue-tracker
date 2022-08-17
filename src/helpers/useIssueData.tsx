import { useQuery } from '@tanstack/react-query'

export const useIssueData = (issueNumber: string | undefined) => {
  console.log(issueNumber)
  async function fetchIssue() {
    const response = await fetch(`/api/issues/${issueNumber}`)
    const data = await response.json()

    return data
  }

  const issueQuery = useQuery(['issues', issueNumber], () => fetchIssue())
  return issueQuery
}
