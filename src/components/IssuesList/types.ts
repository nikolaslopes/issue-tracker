import { IssueItemFormatted } from '../../types/global';
import { LabelListProps } from '../LabelList/types';

export type IssueListProps = Pick<LabelListProps, 'selectedLabels'> & {
  status: string;
  pageNumber: number;
  setPageNumber: () => void;
};
export interface IssueItemProps {
  issue: IssueItemFormatted;
}

export interface ILabel {
  labelId: string;
}
