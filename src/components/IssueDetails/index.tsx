import { useParams } from 'react-router-dom';
import { useIssueComments } from '../../helpers/useIssueComments';
import { useIssueData } from '../../helpers/useIssueData';
import { IssueHeader } from '../IssueHeader';
import { IssueStatus } from '../IssueStatus';
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
                commentsQuery.data?.map((comment) => (
                  <Comment key={comment.id} {...comment} />
                ))
              )}
            </section>
            <aside>
              <IssueStatus
                status={issueQuery.data?.status}
                issueNumber={String(issueQuery.data?.number)}
              />
            </aside>
          </main>
        </>
      )}
    </div>
  );
}
