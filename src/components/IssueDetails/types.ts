import { IComments } from '../../types/global'

export type CommentComponentProps = Pick<
  IComments,
  'comment' | 'createdBy' | 'formattedDate'
>
