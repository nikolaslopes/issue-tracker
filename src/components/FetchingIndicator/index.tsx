import { useIsFetching } from '@tanstack/react-query'
import { Loader } from '../Loader'

export const FetchingIndicator = () => {
  const isFetching = useIsFetching()

  if (!isFetching) {
    return null
  }

  return (
    <div className="fetching-indicator">
      <Loader />
    </div>
  )
}
