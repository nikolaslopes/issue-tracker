import { IComments } from '../../interfaces/global'

export type CommentComponentProps = Pick<
  IComments,
  'comment' | 'createdBy' | 'formattedDate'
>
