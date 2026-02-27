import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FONT_OPTIONS = [
  { id: "small", label: "Small", px: 14 },
  { id: "normal", label: "Normal", px: 16 },
  { id: "medium", label: "Medium", px: 18 },
  { id: "large", label: "Large", px: 20 }
];

function applyFontSize(px) {
  const value = `${px}px`;
  try {
    localStorage.setItem("fontSize", value);
  } catch {
    // ignore
  }
  document.documentElement.style.setProperty("--content-font-size", value);
}

export default function Settings() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState("normal");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("fontSize");
      if (stored) {
        const match = FONT_OPTIONS.find((opt) => `${opt.px}px` === stored);
        if (match) {
          setSelectedId(match.id);
          applyFontSize(match.px);
          return;
        }
      }
      // Fallback to normal if nothing stored or match not found
      const normal = FONT_OPTIONS.find((opt) => opt.id === "normal");
      if (normal) {
        applyFontSize(normal.px);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSelect = (option) => {
    setSelectedId(option.id);
    applyFontSize(option.px);
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      "This will reset ALL progress, vocabulary mastery, and settings for ReVo on this device.\n\nAre you sure?"
    );
    if (!confirmed) return;

    try {
      localStorage.clear();
    } catch {
      // ignore
    }
    window.location.reload();
  };

  return (
    <section className="page">
      <div className="settings-card">
        <header className="page-header">
          <div>
            <p className="muted small">Settings</p>
            <h1>Customize ReVo</h1>
          </div>
        </header>

        <section className="settings-section">
          <h2 className="settings-section-title">Font size</h2>
          <p className="muted small">
            Choose a comfortable reading size for stories, quizzes, and notes.
          </p>
          <div className="settings-font-row">
            {FONT_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                className={
                  "settings-font-option" +
                  (selectedId === option.id
                    ? " settings-font-option--active"
                    : "")
                }
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>

        <section className="settings-section">
          <h2 className="settings-section-title">Information</h2>
          <div className="settings-links">
            <button
              type="button"
              className="secondary-btn settings-link-btn"
              onClick={() => navigate("/help")}
            >
              Help &amp; support
            </button>
            <button
              type="button"
              className="secondary-btn settings-link-btn"
              onClick={() => navigate("/about")}
            >
              About ReVo
            </button>
          </div>
        </section>

        <hr className="settings-divider" />

        <section className="settings-section">
          <h2 className="settings-section-title">Danger zone</h2>
          <p className="muted small">
            Reset all saved progress, mastery, and preferences on this device.
          </p>
          <button
            type="button"
            className="danger-btn"
            onClick={handleReset}
          >
            Reset all progress
          </button>
        </section>
      </div>
    </section>
  );
}

