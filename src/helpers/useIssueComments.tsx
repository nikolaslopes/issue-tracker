import { useInfiniteQuery } from '@tanstack/react-query';
import { IComment, IComments } from '../types/global';
import { relativeDate } from './relativeDate';

export async function fetchComments(
  signal: AbortSignal | undefined,
  issueNumber: string | undefined,
  pageParam: number = 1
) {
  const response = await fetch(
    `/api/issues/${issueNumber}/comments?page=${pageParam}`,
    {
      signal,
    }
  );
  const data: IComment[] = await response.json();

  const comments: IComments[] = data.map((comment) => {
    return {
      ...comment,
      formattedDate: relativeDate(comment.createdDate),
    };
  });

  return comments;
}

export const useIssueComments = (issueNumber: string | undefined) => {
  const commentsQuery = useInfiniteQuery(
    ['issues', issueNumber, 'comments'],
    ({ signal }) => fetchComments(signal, issueNumber),
    {
      getNextPageParam: (lastPage, pages) => {
        console.log(lastPage, pages);
        if (lastPage.length === 0) {
          return;
        }

        return pages.length + 1;
      },
    }
  );

  return commentsQuery;
};
