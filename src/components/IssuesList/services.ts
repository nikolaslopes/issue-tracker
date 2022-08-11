import { relativeDate } from '../../helpers/relativeDate'
import { IssueProps, IssueItemFormatted } from '../../interfaces/global'

export async function fetchIssuesList() {
  const response = await fetch('/api/issues')
  const data: IssueProps[] = await response.json()

  const issueList: IssueItemFormatted[] = data.map((item) => {
    return {
      ...item,
      formattedDate: relativeDate(item.createdDate),
      commentsCounter: item.comments.length,
    }
  })

  return issueList
}
