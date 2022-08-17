import { useState } from 'react'
import { IssuesList } from '../../components/IssuesList'
import { LabelList } from '../../components/LabelList'
import { ILabel } from '../../helpers/useLabelsData'

export function Issues() {
  const [labels, setLabels] = useState<ILabel[]>([])

  function toggleLabel(label: ILabel) {
    setLabels((prevState) =>
      prevState.includes(label)
        ? prevState.filter((currentLabel) => currentLabel !== label)
        : prevState.concat(label)
    )
  }

  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList selectedLabels={labels} />
        </section>
        <aside>
          <LabelList selectedLabels={labels} toggle={toggleLabel} />
        </aside>
      </main>
    </div>
  )
}
