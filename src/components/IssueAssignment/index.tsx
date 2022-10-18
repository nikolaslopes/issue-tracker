import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';
import { useUserData } from '../../helpers/useUserData';
import { Loader } from '../Loader';

import { fetchUsers, updateAssignmentIssue } from './services';
import { IssueAssignmentProps } from './types';

export const IssueAssignment = ({
  assignee,
  issueNumber,
}: IssueAssignmentProps) => {
  const queryClient = useQueryClient();

  const [menuOpen, setMenuOpen] = useState(false);

  const userQuery = useUserData(assignee);
  const usersQuery = useQuery(['users'], fetchUsers);

  const hasUser = userQuery.isSuccess && userQuery.data && !userQuery.isLoading;

  const updateAssignmentIssueMutation = useMutation(updateAssignmentIssue, {
    onMutate: (variables) => {
      const savedCache = queryClient.getQueryData<IssueAssignmentProps>([
        'issues',
        issueNumber,
      ]);

      console.log('var', variables);

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
      rollback?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries(['issues', issueNumber], {
        exact: true,
      });
    },
  });

  function toggleOpenMenu() {
    if (!usersQuery.isLoading) {
      setMenuOpen((prevState) => !prevState);
    }
  }

  function handleUpdateAssignee(assignee: string) {
    updateAssignmentIssueMutation.mutate({
      assignee: assignee,
      issueNumber: issueNumber,
    });
  }

  return (
    <div className="issue-options">
      <div>
        <span>Assignment</span>

        {hasUser ? (
          <div>
            <img
              src={userQuery.data.profilePictureUrl}
              alt={userQuery.data.name}
            />
            {userQuery.data.name}
          </div>
        ) : (
          <div>
            <FaUser />
            {'None'}
          </div>
        )}

        {userQuery.isLoading && <Loader />}
      </div>

      <GoGear onClick={toggleOpenMenu} />

      {menuOpen && (
        <div className="picker-menu">
          {usersQuery.data?.map((user) => (
            <div key={user.id} onClick={() => handleUpdateAssignee(user.id)}>
              <img src={user.profilePictureUrl} alt={user.name} />
              {user.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
