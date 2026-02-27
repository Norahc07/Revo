import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar.jsx";

export default function LayoutShell({ children }) {
  const location = useLocation();
  const hideNav = location.pathname === "/" || location.pathname === "/auth";

  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPromptEvent(event);

      const dismissed = localStorage.getItem("revo_pwa_installed") === "true";
      if (!dismissed) {
        setShowInstall(true);
      }
    };

    const handleAppInstalled = () => {
      localStorage.setItem("revo_pwa_installed", "true");
      setShowInstall(false);
      setInstallPromptEvent(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPromptEvent) return;
    installPromptEvent.prompt();
    try {
      const choice = await installPromptEvent.userChoice;
      if (choice.outcome === "accepted") {
        localStorage.setItem("revo_pwa_installed", "true");
      }
    } catch {
      // ignore
    }
    setShowInstall(false);
    setInstallPromptEvent(null);
  };

  const showInstallBanner = showInstall && !hideNav;

  return (
    <div className={`revo-app${hideNav ? " revo-app--landing" : ""}`}>
      <main className="revo-main">{children}</main>
      {showInstallBanner && (
        <button
          type="button"
          className="pwa-install-banner"
          onClick={handleInstallClick}
        >
          <i className="fa-solid fa-download" aria-hidden="true" />
          <span>Install ReVo</span>
        </button>
      )}
      {!hideNav && <NavBar />}
    </div>
  );
}


