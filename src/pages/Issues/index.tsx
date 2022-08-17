import { useState } from 'react'
import { IssuesList } from '../../components/IssuesList'
import { LabelList } from '../../components/LabelList'
import { StatusSelect } from '../../components/StatusSelect'
import { ILabel } from '../../helpers/useLabelsData'

export function Issues() {
  const [labels, setLabels] = useState<ILabel[]>([])
  const [status, setStatus] = useState('')

  function toggleLabel(label: ILabel) {
    setLabels((prevState) =>
      prevState.includes(label)
        ? prevState.filter((currentLabel) => currentLabel.id !== label.id)
        : prevState.concat(label)
    )
  }

  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList selectedLabels={labels} status={status} />
        </section>
        <aside>
          <LabelList selectedLabels={labels} toggle={toggleLabel} />
          <h3>Status</h3>
          <StatusSelect
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          />
        </aside>
      </main>
    </div>
  )
}
