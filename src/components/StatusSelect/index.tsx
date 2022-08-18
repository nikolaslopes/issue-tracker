import { SelectHTMLAttributes } from 'react'
import { possibleStatus } from '../../helpers/defaultData'

type StatusSelectProps = SelectHTMLAttributes<HTMLSelectElement>

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
  )
}