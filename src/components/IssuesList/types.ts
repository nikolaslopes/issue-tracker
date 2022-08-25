import { IssueItemFormatted } from '../../interfaces/global'
import { ILabelList } from '../LabelList/types'

export type IIssuesList = Pick<ILabelList, 'selectedLabels'> & {
  status: string
}
export interface IssueItemProps {
  issue: IssueItemFormatted
}

export interface ILabel {
  labelId: string
}
