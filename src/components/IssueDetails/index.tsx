import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useIssueComments } from '../../helpers/useIssueComments';
import { useIssueData } from '../../helpers/useIssueData';
import { IssueAssignment } from '../IssueAssignment';
import { IssueHeader } from '../IssueHeader';
import { IssueLabels } from '../IssueLabels';
import { IssueStatus } from '../IssueStatus';
import { Loader } from '../Loader';
import { Comment } from './components/Comment';

export function IssueDetails() {
  const { number } = useParams();

  const issueQuery = useIssueData(number);
  const commentsQuery = useIssueComments(number);

  return (
    <div className="issue-details">
      {issueQuery.isLoading ? (
        <p>Loading issue...</p>
      ) : (
        <>
          <IssueHeader issue={issueQuery.data} />

          <main>
            <section>
              {commentsQuery.isLoading ? (
                <p>loading...</p>
              ) : (
                commentsQuery.data?.pages.map((commentsPage) =>
                  commentsPage.map((comment) => (
                    <Comment key={comment.id} {...comment} />
                  ))
                )
              )}
              {commentsQuery.isFetchingNextPage && <Loader />}
            </section>
            <aside>
              <IssueStatus
                status={issueQuery.data?.status}
                issueNumber={String(issueQuery.data?.number)}
              />

              <IssueAssignment
                assignee={issueQuery.data?.assignee}
                issueNumber={String(issueQuery.data?.number)}
              />

              <IssueLabels
                labels={issueQuery.data?.labels}
                issueNumber={String(issueQuery.data?.number)}
              />
            </aside>
          </main>
        </>
      )}
    </div>
  );
}
