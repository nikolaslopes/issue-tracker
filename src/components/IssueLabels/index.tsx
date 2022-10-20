import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { GoGear } from 'react-icons/go';
import { useLabelsData } from '../../helpers/useLabelsData';

import { updateIssueLabels } from './services';
import { IssueLabelProps } from './types';

export const IssueLabels = ({ labels, issueNumber }: IssueLabelProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const labelsQuery = useLabelsData();

  const queryClient = useQueryClient();
  const updateIssueLabelsMutation = useMutation(updateIssueLabels, {
    onMutate: (variables) => {
      const newLabels = labels?.includes(variables.labelId)
        ? labels.filter((label) => label !== variables.labelId)
        : [...(labels !== undefined ? labels : []), variables.labelId];

      const savedCache = queryClient.getQueryData<IssueLabelProps>([
        'issues',
        issueNumber,
      ]);

      queryClient.setQueryData(['issues', issueNumber], {
        ...savedCache,
        labels: newLabels,
      });

      function rollback() {
        queryClient.setQueryData(['issues', issueNumber], {
          ...savedCache,
        });
      }

      return () => rollback();
    },
    onError: (error, variables, rollback) => {
      rollback?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries(['issues', issueNumber], {
        exact: true,
      });
    },
  });

  function handleToggleMenu() {
    if (labelsQuery.isLoading) {
      return;
    }

    setMenuOpen((prevState) => !prevState);
  }

  function handleUpdateIssueLabels(labelId: string) {
    updateIssueLabelsMutation.mutate({
      labels: labels,
      issueNumber: issueNumber,
      labelId: labelId,
    });
  }

  return (
    <div className="issue-options">
      <div>
        <span>Labels</span>
        {labelsQuery.isLoading
          ? null
          : labels?.map((issueLabel) => {
              const selectedLabel = labelsQuery.data?.find(
                (label) => label.id === issueLabel
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
            const isLabelSelected = labels?.includes(label.id);
            return (
              <div
                key={label.id}
                className={isLabelSelected ? 'selected' : ''}
                onClick={() => handleUpdateIssueLabels(label.id)}
              >
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
