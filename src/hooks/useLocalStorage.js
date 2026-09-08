import { useEffect, useState } from "react";

/**
 * Drop-in replacement for useState that persists to localStorage.
 * Fails silently (falls back to in-memory state) if storage is
 * unavailable — e.g. private browsing modes that block it.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage unavailable — the experience still works, it just
      // won't remember state across a page reload.
    }
  }, [key, value]);

  return [value, setValue];
}
