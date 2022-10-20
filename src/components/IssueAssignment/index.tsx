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

  const updateAssignmentIssueMutation = useMutation(updateAssignmentIssue, {
    onMutate: (variables) => {
      const savedCache = queryClient.getQueryData<IssueAssignmentProps>([
        'issues',
        issueNumber,
      ]);

      queryClient.setQueryData(['issues', issueNumber], {
        ...savedCache,
        assignee: variables.assignee,
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

  function toggleMenu() {
    if (!usersQuery.isLoading) {
      console.log('test');
      setMenuOpen((prevState) => !prevState);
    }
  }

  function handleUpdateAssignee(assignee: string) {
    toggleMenu();
    updateAssignmentIssueMutation.mutate({
      assignee: assignee,
      issueNumber: issueNumber,
    });
  }

  console.log(userQuery.data);

  return (
    <div className="issue-options">
      <div>
        <span>Assignment</span>

        {userQuery.data ? (
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
      </div>

      <GoGear onClick={toggleMenu} opacity={usersQuery.isLoading ? 0.3 : 1} />

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
