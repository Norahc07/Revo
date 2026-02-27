import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles.css";

function applyStoredFontSize() {
  try {
    const value = localStorage.getItem("fontSize");
    if (value) {
      document.documentElement.style.setProperty(
        "--content-font-size",
        value
      );
    }
  } catch {
    // ignore
  }
}

applyStoredFontSize();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .catch(() => {
        // ignore registration errors
      });
  });
}

