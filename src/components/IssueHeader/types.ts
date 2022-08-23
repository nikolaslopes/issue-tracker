import { IssueItemFormatted } from '../../interfaces/global'

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
