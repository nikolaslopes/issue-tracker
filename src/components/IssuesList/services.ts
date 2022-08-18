import { relativeDate } from '../../helpers/relativeDate'
import {
  IssueProps,
  IssueItemFormatted,
  IIssuesSearchResults,
  IIssuesSearchResultsFormatted,
} from '../../interfaces/global'

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
      commentsCounter: item.comments.length,
      formattedDate: relativeDate(item.createdDate),
    }
  })

  return issueList
}

export const fetchIssuesSearchResults = async (searchValue: string) => {
  const response = await fetch(`/api/search/issues?q=${searchValue}`)
  const data: IIssuesSearchResults = await response.json()

  const issueList: IIssuesSearchResultsFormatted = {
    count: data.count,
    items: data.items.map((item) => {
      return {
        ...item,
        commentsCounter: item.comments.length,
        formattedDate: relativeDate(item.createdDate),
      }
    }),
  }

  return issueList
}
