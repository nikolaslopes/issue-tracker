import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { GoGear } from 'react-icons/go';
import { useUserData } from '../../helpers/useUserData';
import { updateIssueStatus } from '../IssueStatus/services';

import { fetchUsers, updateAssignmentIssue } from './services';
import { IssueAssignmentProps } from './types';

export const IssueAssignment = ({
  assignee,
  issueNumber,
}: IssueAssignmentProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const queryClient = useQueryClient();
  const userQuery = useUserData(assignee);
  const usersQuery = useQuery(['users'], fetchUsers);

  const updateAssignmentIssueMutation = useMutation(updateAssignmentIssue, {
    onMutate: (variables) => {
      const savedCache = queryClient.getQueryData<IssueAssignmentProps>([
        'issues',
        issueNumber,
      ]);

      console.log(savedCache);

      queryClient.setQueryData(['issues', issueNumber], {
        ...savedCache,
        assignee: variables,
      });

      function rollback() {
        queryClient.setQueryData(['issues', issueNumber], {
          ...savedCache,
        });
      }

      return () => rollback();
    },
    onError: (error, variables, rollback) => {
      console.log('error', error);
      rollback?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries(['issues', issueNumber], {
        exact: true,
      });
    },
  });

  function handleOpenMenu() {
    if (!usersQuery.isLoading) {
      setMenuOpen(true);
    }
  }

  function handleUpdateAssignee() {
    updateAssignmentIssueMutation.mutate({
      assignee: assignee,
      issueNumber: issueNumber,
    });
  }

  return (
    <div className="issue-options">
      <div>
        <span>Assignment</span>

        {userQuery.isSuccess && (
          <div>
            <img
              src={userQuery.data.profilePictureUrl}
              alt={userQuery.data.name}
            />
            {userQuery.data.name}
          </div>
        )}
      </div>
      <GoGear onClick={handleOpenMenu} />
      {menuOpen && (
        <div className="picker-menu">
          {usersQuery.data?.map((user) => (
            <div key={user.id} onClick={() => {}}>
              <img src={user.profilePictureUrl} alt={user.name} />
              {user.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
