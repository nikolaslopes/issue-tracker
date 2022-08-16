import { BrowserRouter } from 'react-router-dom'
import { Routes } from '../../Routes'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './QueryClient'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
