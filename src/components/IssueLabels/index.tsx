import { useState } from 'react';
import { GoGear } from 'react-icons/go';
import { useLabelsData } from '../../helpers/useLabelsData';
import { IssueProps } from '../../types/global';

export type IssueLabelProps = Pick<IssueProps, 'number' | 'labels'> & {
  issueNumber: string;
};

export const IssueLabel = ({ labels, issueNumber }: IssueLabelProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const labelsQuery = useLabelsData();

  function toggleMenu() {
    if (labelsQuery.isLoading) return;

    setMenuOpen(!menuOpen);
  }

  return (
    <div className="issue-options">
      <div>
        <span>Labels</span>
        {labelsQuery.isLoading
          ? null
          : labels.map((label) => {
              const labelObject = labelsQuery.data?.find(
                (queryLabel) => queryLabel.id === label
              );
              return (
                <span key={label} className={`label ${labelObject?.color}`}>
                  {labelObject?.name}
                </span>
              );
            })}
      </div>
      <GoGear onClick={toggleMenu} />
    </div>
  );
};
