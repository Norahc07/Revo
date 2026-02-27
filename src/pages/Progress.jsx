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

function computeOverall(history) {
  let totalCorrect = 0;
  let totalItems = 0;
  history.forEach((h) => {
    const s = Number.parseInt(h.score ?? 0, 10) || 0;
    const t = Number.parseInt(h.totalItems ?? 0, 10) || 0;
    if (t > 0) {
      totalCorrect += s;
      totalItems += t;
    }
  });
  if (!totalItems) return null;
  return (totalCorrect / totalItems) * 100;
}

export default function Progress() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [overall, setOverall] = useState(null);

  useEffect(() => {
    const data = loadHistory();
    setHistory(data);
    setOverall(computeOverall(data));
  }, []);

  const recent = history.slice(0, 3);

  return (
    <section className="page progress-page">
      <div className="progress-card">
        <header className="progress-header">
          <div>
            <p className="muted small">Overview</p>
            <h1>Your progress</h1>
          </div>
        </header>

        <div className="summary-row">
          <div className="summary-card">
            <div className="summary-card-header">
              <i className="fa-solid fa-chart-line" aria-hidden="true" />
              <div>
                <p className="muted small">Overall average</p>
                <h2>{overall == null ? "—" : `${overall.toFixed(1)}%`}</h2>
              </div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-card-header">
              <i className="fa-solid fa-list-check" aria-hidden="true" />
              <div>
                <p className="muted small">Total tests</p>
                <h2>{history.length}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="card history-card">
          <div className="history-header-row">
            <h2 className="history-title">
              <i className="fa-solid fa-clock-rotate-left" aria-hidden="true" />{" "}
              Recent tests
            </h2>
            <button
              type="button"
              className="link-btn"
              onClick={() => navigate("/history")}
            >
              View history
            </button>
          </div>
          {recent.length === 0 ? (
            <p className="muted small">
              You haven&apos;t taken any tests yet.
            </p>
          ) : (
            <ul className="history-list">
              {recent.map((item, idx) => {
                const date = item.date ? new Date(item.date) : null;
                const score =
                  item.totalItems && item.totalItems > 0
                    ? `${item.score}/${item.totalItems}`
                    : `${item.percent ?? 0}%`;
                return (
                  <li key={idx} className="history-row">
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
          )}
        </div>
      </div>
    </section>
  );
}

