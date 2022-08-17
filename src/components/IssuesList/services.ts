import { relativeDate } from '../../helpers/relativeDate'
import { IssueProps, IssueItemFormatted } from '../../interfaces/global'

export async function fetchIssuesList(labelsParam: string) {
  const response = await fetch(`/api/issues?${labelsParam}`)
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
