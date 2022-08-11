import { IssueProps } from '../../interfaces/global'

export async function fetchIssuesList() {
  const response = await fetch('/api/issues')
  const data = await response.json()

  return data as IssueProps[]
}
