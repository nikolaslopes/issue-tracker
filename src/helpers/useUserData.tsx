import { useQuery } from '@tanstack/react-query';

export interface IUser {
  id: string;
  name: string;
  profilePictureUrl: string;
}

export const useUserData = (userId: string | undefined) => {
  async function fetchUser(signal: AbortSignal | undefined) {
    const response = await fetch(`/api/users/${userId}`, { signal });
    const data: IUser = await response.json();

    return data;
  }

  console.log(userId);

  const userQuery = useQuery(
    ['users', userId],
    ({ signal }) => fetchUser(signal),
    {
      enabled: userId !== null,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );

  return userQuery;
};
