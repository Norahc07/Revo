import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVocabSet } from "../vocabData.js";

export default function VocabStudy() {
  const navigate = useNavigate();
  const { setId } = useParams();
  const cards = getVocabSet(setId);

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (!cards.length) {
    return (
      <section className="page">
        <button
          type="button"
          className="back-link"
          aria-label="Back to vocabulary sets"
          onClick={() => navigate("/vocabulary")}
        >
          <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          <span>Back to sets</span>
        </button>

        <div className="home-card vocab-card">
          <header className="vocab-header">
            <p className="muted small">Vocabulary</p>
            <h1 className="vocab-title">Set not found</h1>
            <p className="muted small vocab-subtitle">
              The vocabulary set you selected does not exist.
            </p>
          </header>
        </div>
      </section>
    );
  }

  const current = cards[index];

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
      setFlipped(false);
    }
  };

  const handleNext = () => {
    if (index < cards.length - 1) {
      setIndex(index + 1);
      setFlipped(false);
    }
  };

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <section className="page">
      <button
        type="button"
        className="back-link"
        aria-label="Back to vocabulary sets"
        onClick={() => navigate("/vocabulary")}
      >
        <i className="fa-solid fa-arrow-left" aria-hidden="true" />
        <span>Back to sets</span>
      </button>

      <div className="home-card vocab-card">
        <header className="vocab-header">
          <p className="muted small">Study</p>
          <h1 className="vocab-title">Set {setId} flashcards</h1>
          <p className="muted small vocab-subtitle">
            Tap the card to flip between word and definition.
          </p>
        </header>

        <div className="study-layout">
          <div
            className={`flashcard${flipped ? " flashcard--flipped" : ""}`}
            onClick={handleFlip}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleFlip();
              }
            }}
          >
            <div className="flashcard-inner">
              <div className="flashcard-face flashcard-face--front">
                <div className="flashcard-label muted tiny">Word</div>
                <div className="flashcard-content">{current.term}</div>
              </div>
              <div className="flashcard-face flashcard-face--back">
                <div className="flashcard-label muted tiny">Definition</div>
                <div className="flashcard-content">{current.definition}</div>
              </div>
            </div>
            <p className="muted tiny flashcard-hint">
              Click or tap to flip
            </p>
          </div>

          <div className="study-controls">
            <button
              type="button"
              className="secondary-btn"
              onClick={handlePrev}
              disabled={index === 0}
            >
              Previous
            </button>
            <span className="study-counter">
              Card {index + 1} of {cards.length}
            </span>
            <button
              type="button"
              className="primary-btn"
              onClick={handleNext}
              disabled={index === cards.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

