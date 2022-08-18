import { useQuery } from '@tanstack/react-query'
import { fetchIssuesList, fetchIssuesSearchResults } from './services'
import { IssueItem } from './components/IssueItem'
import { ILabelList } from '../LabelList'
import { FormEvent, useState } from 'react'

export type IIssuesList = Pick<ILabelList, 'selectedLabels'> & {
  status: string
}

export function IssuesList({ selectedLabels, status }: IIssuesList) {
  const [searchValue, setSearchValue] = useState('')

  const labelsString = selectedLabels
    .map((label) => {
      return `labels[]=${label.id}`
    })
    .join('&')

  const statusString = status ? `&status=${status}` : ''

  const issuesQuery = useQuery(['issues', { selectedLabels, status }], () =>
    fetchIssuesList({ labelsParam: labelsString, statusParam: statusString })
  )

  const searchQuery = useQuery(
    ['issues', 'search', searchValue],
    () => fetchIssuesSearchResults(searchValue),
    {
      enabled: searchValue.length > 0,
    }
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.target as HTMLFormElement)

    const value = String(data.get('search'))

    setSearchValue(value)

    console.log(value)
  }

  console.log(searchQuery.data)

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
      <h2>Issues List</h2>
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
              <p>{searchQuery.data?.length} Results</p>
              <ul className="issues-list">
                {/* {searchQuery.data?.items.map((issue) => (
                  <IssueItem key={issue.id} issue={issue} />
                ))} */}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  )
}
