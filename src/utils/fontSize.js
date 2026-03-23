export const FONT_SIZE_STORAGE_KEY = "fontSize";

/**
 * Persist and apply the user's base reading size app-wide.
 * Drives `html { font-size: var(--content-font-size) }` in CSS.
 */
export function applyContentFontSize(px) {
  const value = `${Number(px)}px`;
  try {
    localStorage.setItem(FONT_SIZE_STORAGE_KEY, value);
  } catch {
    // ignore quota / private mode
  }
  document.documentElement.style.setProperty("--content-font-size", value);
  /* Direct assignment so root size updates even if CSS var resolution hiccups */
  document.documentElement.style.fontSize = value;
}

/** Restore saved size before first paint (call from main.jsx). */
export function restoreContentFontSizeFromStorage() {
  try {
    const value = localStorage.getItem(FONT_SIZE_STORAGE_KEY);
    if (value) {
      document.documentElement.style.setProperty("--content-font-size", value);
      document.documentElement.style.fontSize = value;
    }
  } catch {
    // ignore
  }
}
