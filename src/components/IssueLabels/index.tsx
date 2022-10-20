import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { GoGear } from 'react-icons/go';
import { useLabelsData } from '../../helpers/useLabelsData';
import { IssueProps } from '../../types/global';

export type IssueLabelProps = {
  issueLabels: string[] | undefined;
  issueNumber: string;
};

export const IssueLabels = ({ issueLabels, issueNumber }: IssueLabelProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const queryClient = useQueryClient();
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
          : issueLabels?.map((issueLabel) => {
              const labelDataObject = labelsQuery.data?.find(
                (label) => label.name === issueLabel
              );

              return (
                <span
                  key={issueLabel}
                  className={`label ${labelDataObject?.color}`}
                >
                  {labelDataObject?.name}
                </span>
              );
            })}
      </div>

      <GoGear onClick={toggleMenu} />

      {menuOpen && (
        <div className="picker-menu labels">
          {labelsQuery.data?.map((label) => {
            const selected = issueLabels?.includes(label.id);
            return (
              <div key={label.id} className={selected ? 'selected' : ''}>
                <span
                  className="label-dot"
                  style={{ backgroundColor: label.color }}
                ></span>
                {label.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
