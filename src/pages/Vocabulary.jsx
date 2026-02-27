import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TOTAL_SETS = 5;

function getMastery(set) {
  const value = localStorage.getItem(`vocab${set}_mastery`);
  return Number.parseInt(value || "0", 10) || 0;
}

export default function Vocabulary() {
  const [mastery, setMastery] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = [];
    for (let i = 1; i <= TOTAL_SETS; i += 1) {
      data.push({ set: i, mastery: getMastery(i) });
    }
    setMastery(data);
  }, []);

  return (
    <section className="page">
      <button
        type="button"
        className="back-link"
        aria-label="Back to home"
        onClick={() => navigate("/home")}
      >
        <i className="fa-solid fa-arrow-left" aria-hidden="true" />
        <span>Back to home</span>
      </button>

      <div className="home-card vocab-card">
        <header className="vocab-header">
          <p className="muted small">Vocabulary</p>
          <h1 className="vocab-title">Flashcard sets</h1>
          <p className="muted small vocab-subtitle">
            Reach at least 80% mastery to unlock the next set ✨
          </p>
        </header>

        <div className="vocab-list">
          {mastery.map((item, index) => {
            const { set, mastery: masteryValue } = item;
            const previousMastery =
              index === 0 ? 100 : mastery[index - 1].mastery || 0;
            const locked = index > 0 && previousMastery < 80;

            return (
              <div
                key={set}
                className={
                  "list-card vocab-set" + (locked ? " vocab-set--locked" : "")
                }
              >
                <div className="vocab-set-header">
                  <div className="vocab-set-main">
                    <div className="vocab-set-icon">
                      <i className="fa-solid fa-book-open" aria-hidden="true" />
                    </div>
                    <div>
                      <h2>Set {set}</h2>
                      <p className="muted tiny">20 words</p>
                    </div>
                  </div>
                  <div className="vocab-set-mastery">
                    <p className="muted tiny">Mastery</p>
                    <span className="vocab-set-mastery-value">
                      {Math.round(masteryValue)}%
                    </span>
                  </div>
                </div>

                {locked ? (
                  <p className="muted tiny vocab-lock-note">
                    <i className="fa-solid fa-lock" aria-hidden="true" />{" "}
                    Get 80%+ on Set {set - 1} to unlock
                  </p>
                ) : (
                  <div className="vocab-actions">
                    <button
                      className="secondary-btn"
                      type="button"
                      onClick={() => navigate(`/vocabulary/study/${set}`)}
                    >
                      Study
                    </button>
                    <button
                      className="primary-btn"
                      type="button"
                      onClick={() => navigate(`/vocabulary/test/${set}`)}
                    >
                      Test
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

