import { useQuery } from '@tanstack/react-query'
import { IssueItemProps } from '../components/IssuesList/types'
import { IssueProps } from '../interfaces/global'

export interface IUser {
  id: string
  name: string
  profilePictureUrl: string
}

export const useUserData = (userId: string) => {
  async function fetchUser() {
    const response = await fetch(`/api/users/${userId}`)
    const data: IUser = await response.json()

    return data
  }

  const userQuery = useQuery(['user', userId], fetchUser)

  return userQuery
}
