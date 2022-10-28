import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IssuesList } from '../../components/IssuesList';
import { LabelList } from '../../components/LabelList';
import { StatusSelect } from '../../components/StatusSelect';
import { ILabel } from '../../helpers/useLabelsData';

export function Issues() {
  const [labels, setLabels] = useState<ILabel[]>([]);
  const [status, setStatus] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  function toggleLabelsAndSetPageNumber(label: ILabel) {
    setLabels((prevState) =>
      prevState.includes(label)
        ? prevState.filter((currentLabel) => currentLabel.id !== label.id)
        : prevState.concat(label)
    );
    setPageNumber(1);
  }

  return (
    <div>
      <main>
        <section>
          <IssuesList
            selectedLabels={labels}
            status={status}
            pageNumber={pageNumber}
            setPageNumber={() => setPageNumber}
          />
        </section>
        <aside>
          <LabelList
            selectedLabels={labels}
            toggleLabels={toggleLabelsAndSetPageNumber}
          />

          <h3>Status</h3>
          <StatusSelect
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPageNumber(1);
            }}
          />
          <hr />
          <Link className="button" to="/add">
            Add Issue
          </Link>
        </aside>
      </main>
    </div>
  );
}
