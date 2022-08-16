import { useQuery } from '@tanstack/react-query'

interface IUserData {
  userId: number
}

export const useUserData = ({ userId }: IUserData) => {
  async function fetchUser() {
    const response = await fetch(`/api/users/${userId}`)
    const data = await response.json()

    return data
  }

  const userQuery = useQuery(['user', userId], fetchUser)

  return userQuery
}
