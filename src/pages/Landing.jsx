import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth.js";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  return (
    <section className="landing">
      <div className="landing-card">
        <img
          src="/ReVo_logo-removebg-preview.png"
          alt="ReVo"
          className="landing-logo"
        />
        <h1 className="landing-title">Welcome to ReVo</h1>
        <p className="landing-subtitle">
          A self-contained learning web app for vocabulary and reading
          comprehension. Master new words, read engaging stories, and track your
          progress.
        </p>
        <button
          className="primary-btn landing-cta"
          onClick={() => navigate("/auth")}
        >
          Get Start
        </button>
        <p className="landing-footnote small muted">
          Track your progress · Interactive flashcards · Story quizzes
        </p>
      </div>
    </section>
  );
}

