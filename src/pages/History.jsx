import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function loadHistory() {
  try {
    const raw = JSON.parse(localStorage.getItem("testHistory") || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

const PAGE_SIZE = 10;

export default function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const data = loadHistory();
    setHistory(data);
  }, []);

  const totalPages =
    history.length === 0 ? 1 : Math.ceil(history.length / PAGE_SIZE);

  const currentPage = Math.min(page, totalPages - 1);
  const start = currentPage * PAGE_SIZE;
  const pageItems = history.slice(start, start + PAGE_SIZE);

  const handlePrev = () => {
    setPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <section className="page progress-page">
      <button
        type="button"
        className="back-link"
        aria-label="Back to progress"
        onClick={() => navigate("/progress")}
      >
        <i className="fa-solid fa-arrow-left" aria-hidden="true" />
        <span>Back to progress</span>
      </button>

      <div className="progress-card">
        <header className="progress-header">
          <div>
            <p className="muted small">History</p>
            <h1>All test history</h1>
          </div>
        </header>

        <div className="card history-card">
          <h2 className="history-title">
            <i className="fa-solid fa-clock-rotate-left" aria-hidden="true" />{" "}
            Test history
          </h2>
          {history.length === 0 ? (
            <p className="muted small">
              You haven&apos;t taken any tests yet.
            </p>
          ) : (
            <>
              <ul className="history-list">
                {pageItems.map((item, idx) => {
                  const date = item.date ? new Date(item.date) : null;
                  const score =
                    item.totalItems && item.totalItems > 0
                      ? `${item.score}/${item.totalItems}`
                      : `${item.percent ?? 0}%`;
                  return (
                    <li key={`${start + idx}-${item.testName || item.type || "Test"}`} className="history-row">
                      <div>
                        <div className="history-main">
                          <span>{item.testName || item.type || "Test"}</span>
                          <span className="chip">{score}</span>
                        </div>
                        <p className="muted tiny">
                          {date ? date.toLocaleString() : ""}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {totalPages > 1 && (
                <div className="history-pagination">
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={handlePrev}
                    disabled={currentPage === 0}
                  >
                    Previous
                  </button>
                  <span className="muted tiny">
                    Page {currentPage + 1} of {totalPages}
                  </span>
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={handleNext}
                    disabled={currentPage === totalPages - 1}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

