import { possibleStatus } from '../../helpers/defaultData';
import { IStatusSelect } from './types';

export const StatusSelect = ({
  noEmptyOption = false,
  ...rest
}: IStatusSelect) => {
  return (
    <select className="status-select" {...rest}>
      {noEmptyOption ? null : (
        <option value="ass">Select a status to filter</option>
      )}
      {possibleStatus.map((status) => (
        <option key={status.id} value={status.id}>
          {status.label}
        </option>
      ))}
    </select>
  );
};
