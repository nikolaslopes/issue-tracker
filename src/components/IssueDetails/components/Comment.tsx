import { useUserData } from '../../../helpers/useUserData';
import { CommentComponentProps } from '../types';

export const Comment = ({
  comment,
  createdBy,
  formattedDate,
}: CommentComponentProps) => {
  const userQuery = useUserData(createdBy);
  const user = userQuery.data;

  if (userQuery.isLoading) {
    return (
      <div className="comment">
        <div>
          <div className="comment-header">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="comment">
      <img
        src={user?.profilePictureUrl}
        alt={`${user?.name ? user.name : 'Commenter'} Avatar`}
      />
      <div>
        <div className="comment-header">
          <span>{user?.name}</span> commented <span>{formattedDate}</span>
        </div>
        <div className="comment-body">{comment}</div>
      </div>
    </div>
  );
};
