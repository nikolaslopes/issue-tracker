interface IUserData {
  userId: number
}

export async function useUserData({ userId }: IUserData) {
  const response = await fetch(`/api/users/${userId}`)
  const data = await response.json()

  return data
}
