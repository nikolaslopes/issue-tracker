import { ILabel } from '../../helpers/useLabelsData'

export interface ILabelList {
  selectedLabels: ILabel[]
  toggle: (label: ILabel) => void
}
