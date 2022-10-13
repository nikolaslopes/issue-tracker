import { possibleStatus } from '../../helpers/defaultData';
import { StatusSelectProps } from './types';

export const StatusSelect = ({ ...rest }: StatusSelectProps) => {
  return (
    <select className="status-select" {...rest}>
      <option value="">Select a status to filter</option>
      {possibleStatus.map((status) => (
        <option key={status.id} value={status.id}>
          {status.label}
        </option>
      ))}
    </select>
  );
};
