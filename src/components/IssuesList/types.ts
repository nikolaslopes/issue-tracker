import { IssueItemFormatted } from '../../types/global';
import { LabelListProps } from '../LabelList/types';

export type IIssuesList = Pick<LabelListProps, 'selectedLabels'> & {
  status: string;
};
export interface IssueItemProps {
  issue: IssueItemFormatted;
}

export interface ILabel {
  labelId: string;
}
