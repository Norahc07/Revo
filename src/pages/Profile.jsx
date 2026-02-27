import { getCurrentUser, logoutUser } from "../utils/auth.js";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const joined =
    user?.createdAt && !Number.isNaN(Date.parse(user.createdAt))
      ? new Date(user.createdAt).toLocaleDateString()
      : "—";

  function handleLogout() {
    logoutUser();
    navigate("/auth", { replace: true });
  }

  return (
    <section className="page">
      <div className="profile-card">
        <header className="page-header">
          <div>
            <p className="muted small">Account</p>
            <h1>Profile</h1>
          </div>
        </header>

        <div className="profile-fields">
          <div className="profile-row">
            <span className="profile-label">Username</span>
            <span>{user?.username || "—"}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Email</span>
            <span>{user?.email || "—"}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Member since</span>
            <span>{joined}</span>
          </div>
        </div>

        <button className="primary-btn" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </section>
  );
}

