import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchIssuesList, fetchIssuesSearchResults } from './services'
import { IssueItem } from './components/IssueItem'
import { FormEvent, useState } from 'react'
import { IIssuesList } from './types'
import { Loader } from '../Loader'

export function IssuesList({ selectedLabels, status }: IIssuesList) {
  const [searchValue, setSearchValue] = useState('')

  const labelsString = selectedLabels
    .map((label) => {
      return `labels[]=${label.id}`
    })
    .join('&')

  const statusString = status ? `&status=${status}` : ''

  const issuesQuery = useQuery(
    ['issues', { selectedLabels, status }],
    ({ signal }) =>
      fetchIssuesList({
        labelsParam: labelsString,
        statusParam: statusString,
        signal,
      })
  )

  const searchQuery = useQuery(
    ['issues', 'search', searchValue],
    ({ signal }) => fetchIssuesSearchResults(searchValue, signal),
    {
      enabled: searchValue.length > 0,
    }
  )

  const searchResults = searchQuery.data

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.target as HTMLFormElement)

    const value = String(data.get('search'))

    setSearchValue(value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search Issues</label>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search"
          onChange={(event) => {
            if (event.target.value.length === 0) {
              setSearchValue('')
            }
          }}
        />
      </form>

      <h2>Issues List {issuesQuery.isFetching ? <Loader /> : null}</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : searchQuery.fetchStatus === 'idle' &&
        searchQuery.isLoading === true ? (
        <ul className="issues-list">
          {issuesQuery.data?.map((issue) => (
            <IssueItem key={issue.id} issue={issue} />
          ))}
        </ul>
      ) : (
        <>
          <h2>Search results:</h2>
          {searchQuery.isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>{searchResults?.count} Results</p>
              <ul className="issues-list">
                {searchQuery.data?.items.map((issue) => (
                  <IssueItem key={issue.id} issue={issue} />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  )
}
