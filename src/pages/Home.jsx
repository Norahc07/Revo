import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth.js";

const CARDS = [
  {
    title: "Flashcards",
    subtitle: "Vocabulary cards and quick quizzes",
    action: "Go to flashcards",
    to: "/vocabulary",
    icon: "fa-clone"
  },
  {
    title: "Story lessons",
    subtitle: "Short readings with comprehension quizzes",
    action: "Go to stories",
    to: "/stories",
    icon: "fa-book-open-reader"
  }
];

export default function Home() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  return (
    <section className="page home-page">
      <div className="home-card">
        <header className="home-header">
          <div>
            <p className="muted small">Welcome back to ReVo</p>
            <h1 className="home-title">{user?.username || "ReVo learner"}</h1>
            <p className="muted small home-subtitle">
              What would you like to practice today?
            </p>
          </div>
        </header>

        <div className="card-grid home-grid">
          {CARDS.map((card) => (
            <button
              key={card.to}
              className="feature-card"
              onClick={() => navigate(card.to)}
            >
              <div className="feature-card-header">
                <i className={`fa-solid ${card.icon}`} aria-hidden="true" />
                <h2>{card.title}</h2>
              </div>
              <p className="muted">{card.subtitle}</p>
              <span className="chip">{card.action}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

