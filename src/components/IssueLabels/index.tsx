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

  function handleToggleMenu() {
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
              const selectedLabel = labelsQuery.data?.find(
                (label) => label.name === issueLabel
              );

              return (
                <span
                  key={issueLabel}
                  className={`label ${selectedLabel?.color}`}
                >
                  {selectedLabel?.name}
                </span>
              );
            })}
      </div>

      <GoGear onClick={handleToggleMenu} />

      {menuOpen && (
        <div className="picker-menu labels">
          {labelsQuery.data?.map((label) => {
            const isLabelSelected = issueLabels?.includes(label.name);
            return (
              <div key={label.id} className={isLabelSelected ? 'selected' : ''}>
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
