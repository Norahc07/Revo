import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <section className="page">
      <button
        type="button"
        className="back-link"
        aria-label="Back to settings"
        onClick={() => navigate("/settings")}
      >
        <i className="fa-solid fa-arrow-left" aria-hidden="true" />
        <span>Back to settings</span>
      </button>

      <div className="settings-card">
        <header className="page-header">
          <div>
            <p className="muted small">About</p>
            <h1>About This Website</h1>
          </div>
        </header>

        <section className="settings-section">
          <p className="muted small">
            This app is designed to help users track their learning progress,
            practice vocabulary and reading comprehension, and manage study
            sessions effectively.
          </p>

          <h2 className="settings-section-title">Features include:</h2>
          <ul className="about-list">
            <li>Track progress with averages and test history</li>
            <li>Flashcards and reading stories</li>
            <li>Theme and font size customization</li>
            <li>Help &amp; Support contact</li>
          </ul>
        </section>
      </div>
    </section>
  );
}

