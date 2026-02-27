import { useNavigate } from "react-router-dom";

export default function Notes() {
  const navigate = useNavigate();

  return (
    <section className="page">
      <div className="notes-card">
        <header className="page-header">
          <div>
            <p className="muted small">Notes</p>
            <h1>Sticky Notes Board</h1>
          </div>
        </header>

        <p className="muted small">
          Capture ideas, reminders, and stickers on a playful board that stays
          saved on this device.
        </p>

        <ul className="notes-features muted small">
          <li>Add colorful sticky notes with your own text.</li>
          <li>Tap emojis to quickly decorate each note.</li>
          <li>Notes stay saved locally between sessions.</li>
        </ul>

        <button
          type="button"
          className="primary-btn"
          onClick={() => navigate("/notes/board")}
        >
          Open sticky notes board
        </button>
      </div>
    </section>
  );
}

