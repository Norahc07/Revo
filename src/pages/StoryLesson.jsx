import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStory } from "../storiesData.js";

const READING_TIME_SECONDS = 30;

export default function StoryLesson() {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const story = getStory(lessonId);

  const [phase, setPhase] = useState("read"); // "read" | "timeout" | "quiz" | "finished"
  const [timeLeft, setTimeLeft] = useState(READING_TIME_SECONDS);

  const totalQuestions = story?.questions?.length || 0;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(() =>
    totalQuestions > 0 ? Array(totalQuestions).fill(null) : []
  );
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    if (!story) return;
    if (phase !== "read") return;
    if (timeLeft <= 0) return;

    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setPhase("timeout");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [phase, story, timeLeft]);

  if (!story) {
    return (
      <section className="page">
        <button
          type="button"
          className="back-link"
          aria-label="Back to stories"
          onClick={() => navigate("/stories")}
        >
          <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          <span>Back to stories</span>
        </button>

        <div className="home-card stories-card">
          <header className="stories-header">
            <p className="muted small">Reading</p>
            <h1 className="stories-title">Story not found</h1>
          </header>
        </div>
      </section>
    );
  }

  const allAnswered =
    totalQuestions > 0 && answers.every((value) => value !== null);

  const handleStartQuiz = () => {
    if (timeLeft <= 0) return;
    setPhase("quiz");
  };

  const handleOptionClick = (optionIndex) => {
    if (phase !== "quiz") return;
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = optionIndex;
      return next;
    });
  };

  const handlePrev = () => {
    if (phase !== "quiz") return;
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const handleNextOrFinish = () => {
    if (phase !== "quiz") return;

    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex(questionIndex + 1);
      return;
    }

    if (!allAnswered) return;

    let correctCount = 0;
    story.questions.forEach((question, qIndex) => {
      const answerIndex = answers[qIndex];
      if (answerIndex === null) return;
      if (answerIndex === question.correctIndex) {
        correctCount += 1;
      }
    });

    const percent = Math.round((correctCount / totalQuestions) * 100);
    const didPass = percent >= 80;

    try {
      const key = `story${lessonId}_mastery`;
      const raw = localStorage.getItem(key);
      const previous = Number.parseInt(raw || "0", 10) || 0;
      const toStore = didPass ? Math.max(previous, percent) : previous;
      localStorage.setItem(key, String(toStore));

      const historyRaw = localStorage.getItem("testHistory");
      const history = historyRaw ? JSON.parse(historyRaw) : [];
      const entry = {
        type: "Story",
        testName: `Story ${lessonId} quiz`,
        score: correctCount,
        totalItems: totalQuestions,
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
    setPhase("finished");
  };

  const handleRetry = () => {
    setAnswers(Array(totalQuestions).fill(null));
    setQuestionIndex(0);
    setScore(0);
    setPassed(false);
    setPhase("quiz");
  };

  const renderReadPhase = () => (
    <section className="page">
      <button
        type="button"
        className="back-link"
        aria-label="Back to stories"
        onClick={() => navigate("/stories")}
      >
        <i className="fa-solid fa-arrow-left" aria-hidden="true" />
        <span>Back to stories</span>
      </button>

      <div className="home-card stories-card">
        <header className="stories-header">
          <p className="muted small">Reading</p>
          <h1 className="stories-title">{story.title}</h1>
          <p className="muted small stories-subtitle">
            Read the story below. You have 30 seconds before the quiz closes.
          </p>
        </header>

        <div className="story-body">
          <p>{story.text}</p>
        </div>

        <div className="story-footer">
          <span className="story-timer">
            Time left: {Math.floor(timeLeft / 10)}
            {timeLeft % 10}s
          </span>
          <button
            type="button"
            className="primary-btn"
            onClick={handleStartQuiz}
            disabled={timeLeft <= 0}
          >
            Start quiz
          </button>
        </div>
      </div>
    </section>
  );

  const renderTimeoutPhase = () => (
    <section className="page">
      <button
        type="button"
        className="back-link"
        aria-label="Back to stories"
        onClick={() => navigate("/stories")}
      >
        <i className="fa-solid fa-arrow-left" aria-hidden="true" />
        <span>Back to stories</span>
      </button>

      <div className="home-card stories-card">
        <header className="stories-header">
          <p className="muted small">Reading</p>
          <h1 className="stories-title">{story.title}</h1>
          <p className="muted small stories-subtitle">
            The reading time has ended, and this quiz is now closed. Go back to
            the stories list to try again.
          </p>
        </header>
      </div>
    </section>
  );

  if (phase === "read") {
    return renderReadPhase();
  }

  if (phase === "timeout") {
    return renderTimeoutPhase();
  }

  if (phase === "finished") {
    const percent = Math.round((score / totalQuestions) * 100);
    return (
      <section className="page">
        <button
          type="button"
          className="back-link"
          aria-label="Back to stories"
          onClick={() => navigate("/stories")}
        >
          <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          <span>Back to stories</span>
        </button>

        <div className="home-card stories-card">
          <header className="stories-header">
            <p className="muted small">Results</p>
            <h1 className="stories-title">Story {lessonId} quiz</h1>
            <p className="muted small stories-subtitle">
              You answered {score} out of {totalQuestions} correctly. You need
              80% or higher to pass.
            </p>
          </header>

          <div className="test-results">
            <p className="test-score">
              {percent}
              <span className="muted small"> % mastery</span>
            </p>
            {!passed && (
              <p className="muted small">
                You did not reach 80% mastery. Try the quiz again to unlock the
                next story.
              </p>
            )}
            {passed && (
              <p className="muted small">
                Great work! You passed this comprehension quiz. The next story
                will unlock based on your mastery.
              </p>
            )}
            <div className="test-results-actions">
              {!passed && (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={handleRetry}
                >
                  Retry quiz
                </button>
              )}
              <button
                type="button"
                className="primary-btn"
                onClick={() => navigate("/stories")}
              >
                Back to stories
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Quiz phase: questions only, story text is hidden
  const question = story.questions[questionIndex];
  const currentAnswer = answers[questionIndex];

  return (
    <section className="page">
      <button
        type="button"
        className="back-link"
        aria-label="Back to stories"
        onClick={() => navigate("/stories")}
      >
        <i className="fa-solid fa-arrow-left" aria-hidden="true" />
        <span>Back to stories</span>
      </button>

      <div className="home-card stories-card">
        <header className="stories-header">
          <p className="muted small">Quiz</p>
          <h1 className="stories-title">Story {lessonId} questions</h1>
          <p className="muted small stories-subtitle">
            Answer each question about the story you just read.
          </p>
        </header>

        <div className="test-layout">
          <div className="test-question-card">
            <p className="muted tiny">
              Question {questionIndex + 1} of {totalQuestions}
            </p>
            <h2>{question.prompt}</h2>
          </div>

          <div className="quiz-options">
            {question.options.map((option, i) => {
              let optionClass = "quiz-option";
              if (currentAnswer === i) {
                optionClass += " quiz-option--selected";
              }

              return (
                <button
                  key={option}
                  type="button"
                  className={optionClass}
                  onClick={() => handleOptionClick(i)}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div className="test-controls">
            {questionIndex > 0 && (
              <button
                type="button"
                className="secondary-btn"
                onClick={handlePrev}
              >
                Previous
              </button>
            )}
            <span className="test-counter">
              Question {questionIndex + 1} of {totalQuestions}
            </span>
            <button
              type="button"
              className="primary-btn test-next-btn"
              onClick={handleNextOrFinish}
              disabled={questionIndex === totalQuestions - 1 && !allAnswered}
            >
              {questionIndex === totalQuestions - 1 ? "Finish quiz" : "Next question"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

