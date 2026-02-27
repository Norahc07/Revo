import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVocabSet } from "../vocabData.js";

function buildQuestions(cards) {
  const shuffledCards = [...cards].sort(() => Math.random() - 0.5);

  return shuffledCards.map((card, index) => {
    const others = shuffledCards.filter((_, i) => i !== index);
    const shuffledOthers = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
    const optionDefs = [...shuffledOthers, card]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({
        id: item.term,
        text: item.definition,
        correct: item.term === card.term
      }));

    return {
      prompt: card.term,
      options: optionDefs
    };
  });
}

export default function VocabTest() {
  const navigate = useNavigate();
  const { setId } = useParams();
  const cards = getVocabSet(setId);

  const [questions, setQuestions] = useState(() => buildQuestions(cards));
  const total = questions.length;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(() => Array(total).fill(null));
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [passed, setPassed] = useState(false);

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

  const current = questions[index];
  const currentAnswer = answers[index];
  const allAnswered = answers.every((value) => value !== null);

  const handleOptionClick = (optionIndex) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = optionIndex;
      return next;
    });
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleNextOrFinish = () => {
    if (index < total - 1) {
      setIndex(index + 1);
      return;
    }

    if (!allAnswered) return;

    let correctCount = 0;
    questions.forEach((question, qIndex) => {
      const answerIndex = answers[qIndex];
      if (answerIndex === null) return;
      const chosen = question.options[answerIndex];
      if (chosen && chosen.correct) {
        correctCount += 1;
      }
    });

    const percent = Math.round((correctCount / total) * 100);
    const didPass = percent >= 80;

    try {
      const key = `vocab${setId}_mastery`;
      const raw = localStorage.getItem(key);
      const previous = Number.parseInt(raw || "0", 10) || 0;
      const toStore = didPass ? Math.max(previous, percent) : previous;
      localStorage.setItem(key, String(toStore));

      const historyRaw = localStorage.getItem("testHistory");
      const history = historyRaw ? JSON.parse(historyRaw) : [];
      const entry = {
        type: "Vocabulary",
        testName: `Set ${setId} quiz`,
        score: correctCount,
        totalItems: total,
        percent,
        passed: didPass,
        date: new Date().toISOString()
      };
      history.unshift(entry);
      localStorage.setItem("testHistory", JSON.stringify(history));
    } catch {
      // ignore storage errors
    }

    setScore(correctCount);
    setPassed(didPass);
    setCompleted(true);
  };

  const handleRetry = () => {
    const nextQuestions = buildQuestions(cards);
    setQuestions(nextQuestions);
    setAnswers(Array(nextQuestions.length).fill(null));
    setIndex(0);
    setScore(0);
    setPassed(false);
    setCompleted(false);
  };

  if (completed) {
    const percent = Math.round((score / total) * 100);

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
            <p className="muted small">Test results</p>
            <h1 className="vocab-title">Set {setId} mastery</h1>
            <p className="muted small vocab-subtitle">
              You answered {score} out of {total} correctly. You need at least
              {" "}
              80% mastery to pass this set.
            </p>
          </header>

          <div className="test-results">
            <p className="test-score">
              {percent}
              <span className="muted small"> % mastery</span>
            </p>
            {!passed && (
              <p className="muted small">
                You did not reach 80% mastery. Try the test again to unlock the
                next set.
              </p>
            )}
            {passed && (
              <p className="muted small">
                Great job! You passed this test. The next set will unlock based
                on your mastery.
              </p>
            )}
            <div className="test-results-actions">
              {!passed && (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={handleRetry}
                >
                  Retry test
                </button>
              )}
              <button
                type="button"
                className="primary-btn"
                onClick={() => navigate("/vocabulary")}
              >
                Back to flashcard sets
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
          <p className="muted small">Test</p>
          <h1 className="vocab-title">Set {setId} quiz</h1>
          <p className="muted small vocab-subtitle">
            Choose the correct definition for each word.
          </p>
        </header>

        <div className="test-layout">
          <div className="test-question-card">
            <p className="muted tiny">
              Question {index + 1} of {total}
            </p>
            <h2>{current.prompt}</h2>
          </div>

          <div className="quiz-options">
            {current.options.map((option, i) => {
              let optionClass = "quiz-option";
              if (currentAnswer === i) {
                optionClass += " quiz-option--selected";
              }

              return (
                <button
                  key={option.id}
                  type="button"
                  className={optionClass}
                  onClick={() => handleOptionClick(i)}
                >
                  {option.text}
                </button>
              );
            })}
          </div>

          <div className="test-controls">
            {index > 0 && (
              <button
                type="button"
                className="secondary-btn"
                onClick={handlePrev}
              >
                Previous
              </button>
            )}
            <span className="test-counter">
              Question {index + 1} of {total}
            </span>
            <button
              type="button"
              className="primary-btn test-next-btn"
              onClick={handleNextOrFinish}
              disabled={index === total - 1 && !allAnswered}
            >
              {index === total - 1 ? "Finish test" : "Next question"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

