import { IssueItemFormatted } from '../../types/global'

export interface IssueHeaderProps {
  issue:
    | Pick<
        IssueItemFormatted,
        | 'id'
        | 'title'
        | 'status'
        | 'createdBy'
        | 'number'
        | 'formattedDate'
        | 'commentsCounter'
      >
    | undefined
}
