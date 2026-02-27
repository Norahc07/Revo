import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SUPPORT_EMAIL = "support@example.com";

export default function Help() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const body = encodeURIComponent(message || "");
    const subject = encodeURIComponent("ReVo help & support");
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  };

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
            <p className="muted small">Help</p>
            <h1>Help &amp; support</h1>
          </div>
        </header>

        <section className="settings-section">
          <p className="muted small">
            If you have questions or suggestions, write below and click send.
            It will open your email client to contact us.
          </p>

          <div className="help-form">
            <label className="help-label muted tiny" htmlFor="help-message">
              Your question or suggestion
            </label>
            <textarea
              id="help-message"
              className="help-textarea"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question or suggestions here..."
            />
            <button
              type="button"
              className="primary-btn help-send-btn"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}

