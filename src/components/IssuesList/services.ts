import { relativeDate } from '../../helpers/relativeDate'
import { IssueProps, IssueItemFormatted } from '../../interfaces/global'

interface FetchIssuesListProps {
  labelsParam: string
  statusParam: string
}

export async function fetchIssuesList({
  labelsParam,
  statusParam,
}: FetchIssuesListProps) {
  const response = await fetch(`/api/issues?${labelsParam}${statusParam}`)
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
