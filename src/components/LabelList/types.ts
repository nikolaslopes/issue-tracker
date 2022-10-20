import { ILabel } from '../../helpers/useLabelsData';

export type LabelListProps = {
  selectedLabels: ILabel[];
  toggleLabels: (label: ILabel) => void;
};
