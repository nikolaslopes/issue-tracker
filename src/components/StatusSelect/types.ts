import { SelectHTMLAttributes } from 'react';

export interface IStatusSelect extends SelectHTMLAttributes<HTMLSelectElement> {
  noEmptyOption?: boolean;
}
