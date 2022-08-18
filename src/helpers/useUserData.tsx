import { useQuery } from '@tanstack/react-query'

export interface IUser {
  id: string
  name: string
  profilePictureUrl: string
}

export const useUserData = (userId: string | undefined) => {
  async function fetchUser() {
    const response = await fetch(`/api/users/${userId}`)
    const data: IUser = await response.json()

    return data
  }

  const userQuery = useQuery(['user', userId], fetchUser, {
    enabled: userId !== null,
  })
  return userQuery
}
