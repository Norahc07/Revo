import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TOTAL_STORIES = 5;

function getStoryMastery(lesson) {
  const value = localStorage.getItem(`story${lesson}_mastery`);
  return Number.parseInt(value || "0", 10) || 0;
}

export default function Stories() {
  const navigate = useNavigate();
  const [mastery, setMastery] = useState([]);

  useEffect(() => {
    const data = [];
    for (let i = 1; i <= TOTAL_STORIES; i += 1) {
      data.push({ lesson: i, mastery: getStoryMastery(i) });
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

      <div className="home-card stories-card">
        <header className="stories-header">
          <p className="muted small">Reading</p>
          <h1 className="stories-title">Story lessons</h1>
          <p className="muted small stories-subtitle">
            Reach at least 80% on each quiz to unlock the next story ✨
          </p>
        </header>

        <div className="stories-list">
          {mastery.map((item, index) => {
            const { lesson, mastery: value } = item;
            const previousMastery =
              index === 0 ? 100 : mastery[index - 1].mastery || 0;
            const locked = index > 0 && previousMastery < 80;

            return (
              <div
                key={lesson}
                className={
                  "list-card stories-item" +
                  (locked ? " stories-item--locked" : "")
                }
              >
                <div className="list-card-main">
                  <div className="list-card-title-row">
                    <i
                      className="fa-solid fa-book-open-reader"
                      aria-hidden="true"
                    />
                    <h2>Story {lesson}</h2>
                  </div>
                  <p className="muted small">
                    Short reading + comprehension quiz
                  </p>
                </div>
                <div className="stories-item-meta">
                  <p className="muted tiny">Mastery</p>
                  <span className="stories-item-mastery">
                    {Math.round(value)}%
                  </span>
                </div>
                {locked ? (
                  <p className="muted tiny stories-lock-note">
                    <i className="fa-solid fa-lock" aria-hidden="true" /> Get
                    80%+ on Story {lesson - 1} to unlock
                  </p>
                ) : (
                  <div className="stories-actions">
                    <button
                      type="button"
                      className="primary-btn"
                      onClick={() => navigate(`/stories/lesson/${lesson}`)}
                    >
                      Open story
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

