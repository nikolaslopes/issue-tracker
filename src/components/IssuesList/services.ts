import { relativeDate } from '../../helpers/relativeDate';
import {
  IssueProps,
  IssueItemFormatted,
  IIssuesSearchResults,
  IIssuesSearchResultsFormatted,
} from '../../types/global';

interface FetchIssuesListProps {
  labelsParam: string;
  statusParam: string;
  paginationParam: string;
  signal: AbortSignal | undefined;
}

export async function fetchIssuesList({
  labelsParam,
  statusParam,
  paginationParam,
  signal,
}: FetchIssuesListProps) {
  const url = `/api/issues?${labelsParam}${statusParam}${paginationParam}`;
  const response = await fetch(url, { signal });
  const data: IssueProps[] = await response.json();

  const issueList: IssueItemFormatted[] = data.map((item) => {
    return {
      ...item,
      commentsCounter: item.comments.length,
      formattedDate: relativeDate(item.createdDate),
    };
  });

  return issueList;
}

export const fetchIssuesSearchResults = async (
  searchValue: string,
  signal: AbortSignal | undefined
) => {
  const response = await fetch(`/api/search/issues?q=${searchValue}`, {
    signal,
  });
  const data: IIssuesSearchResults = await response.json();

  const issueList: IIssuesSearchResultsFormatted = {
    count: data.count,
    items: data.items.map((item) => {
      return {
        ...item,
        commentsCounter: item.comments.length,
        formattedDate: relativeDate(item.createdDate),
      };
    }),
  };

  return issueList;
};
