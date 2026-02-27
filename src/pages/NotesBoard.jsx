import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "stickyNotes";
const EMOJIS = ["😊", "📚", "⭐", "🔥", "✅", "💡"];

function loadNotes() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function saveNotes(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // ignore storage errors
  }
}

export default function NotesBoard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  const handleAdd = () => {
    const next = [
      ...notes,
      { id: Date.now(), text: "" }
    ];
    setNotes(next);
    saveNotes(next);
  };

  const handleChange = (id, value) => {
    const next = notes.map((note) =>
      note.id === id ? { ...note, text: value } : note
    );
    setNotes(next);
    saveNotes(next);
  };

  const handleDelete = (id) => {
    const next = notes.filter((note) => note.id !== id);
    setNotes(next);
    saveNotes(next);
  };

  const handleAddEmoji = (id, emoji) => {
    const next = notes.map((note) =>
      note.id === id ? { ...note, text: `${note.text || ""}${emoji}` } : note
    );
    setNotes(next);
    saveNotes(next);
  };

  return (
    <section className="page">
      <button
        type="button"
        className="back-link"
        aria-label="Back to notes"
        onClick={() => navigate("/notes")}
      >
        <i className="fa-solid fa-arrow-left" aria-hidden="true" />
        <span>Back to notes</span>
      </button>

      <div className="notes-card notes-board">
        <header className="page-header">
          <div>
            <p className="muted small">Notes</p>
            <h1>Sticky notes board</h1>
          </div>
          <button
            type="button"
            className="secondary-btn"
            onClick={handleAdd}
          >
            Add note
          </button>
        </header>

        <p className="muted small">
          Add colorful sticky notes and decorate them with emojis. Notes are
          saved locally on this device.
        </p>

        <div className="notes-grid">
          {notes.length === 0 ? (
            <p className="muted small">
              You don&apos;t have any notes yet. Click &quot;Add note&quot; to
              start your board.
            </p>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="note-card">
                <textarea
                  className="note-textarea"
                  value={note.text}
                  onChange={(e) => handleChange(note.id, e.target.value)}
                  placeholder="Type your note here..."
                />
                <div className="note-footer">
                  <div className="note-emoji-row">
                    {EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        className="note-emoji-btn"
                        onClick={() => handleAddEmoji(note.id, emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="link-btn note-delete-btn"
                    onClick={() => handleDelete(note.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

