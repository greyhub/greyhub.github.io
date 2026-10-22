import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { siteConfig, type ThemePreference } from "../data/siteConfig";
import { readStored, writeStored } from "../storage";

type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  preference: ThemePreference;
  resolved: ResolvedTheme;
  setPreference: (preference: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const DARK_QUERY = "(prefers-color-scheme: dark)";

const isPreference = (value: unknown): value is ThemePreference =>
  typeof value === "string" && (siteConfig.site.themeOptions as readonly string[]).includes(value);

function initialPreference(): ThemePreference {
  const stored = readStored(siteConfig.site.storageKeys.theme);
  return isPreference(stored) ? stored : siteConfig.site.defaultTheme;
}

const systemTheme = (): ResolvedTheme => (window.matchMedia?.(DARK_QUERY).matches ? "dark" : "light");

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(initialPreference);
  const [system, setSystem] = useState<ResolvedTheme>(systemTheme);

  useEffect(() => {
    const media = window.matchMedia?.(DARK_QUERY);
    if (!media) return;
    const onChange = () => setSystem(media.matches ? "dark" : "light");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const resolved: ResolvedTheme = preference === "system" ? system : preference;

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = resolved;
    root.style.colorScheme = resolved;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", resolved === "dark" ? "#07090e" : "#f4f5f8");
  }, [resolved]);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    writeStored(siteConfig.site.storageKeys.theme, next);
  }, []);

  const value = useMemo(() => ({ preference, resolved, setPreference }), [preference, resolved, setPreference]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
