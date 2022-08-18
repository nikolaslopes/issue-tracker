import { useQuery } from '@tanstack/react-query'
import { useUserData } from '../../../helpers/useUserData'
import { IComment } from '../../../interfaces/global'

export const Comment = ({ comment, createdBy, createdDate }: IComment) => {
  const userQuery = useUserData(createdBy)
  const user = userQuery.data

  if (userQuery.isLoading) {
    return (
      <div className="comment">
        <div>
          <div className="comment-header">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="comment">
      <img
        src={user?.profilePictureUrl}
        alt={`${user?.name ? user.name : 'Commenter'} Avatar`}
      />
    </div>
  )
}
