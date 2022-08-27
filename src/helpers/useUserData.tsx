import { useQuery } from '@tanstack/react-query'

export interface IUser {
  id: string
  name: string
  profilePictureUrl: string
}

export const useUserData = (
  userId: string | undefined,
  signal: AbortSignal
) => {
  async function fetchUser() {
    const response = await fetch(`/api/users/${userId}`, { signal })
    const data: IUser = await response.json()

    return data
  }

  const userQuery = useQuery(['user', userId], ({ signal }) => fetchUser, {
    enabled: userId !== null,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  return userQuery
}
