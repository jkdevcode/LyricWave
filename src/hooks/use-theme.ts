// originally written by @imoaazahmed

import { useEffect, useMemo, useState } from "react";

const ThemeProps = {
  key: "theme",
  light: "light",
  dark: "dark",
} as const;

type Theme = typeof ThemeProps.light | typeof ThemeProps.dark;

export const useTheme = (defaultTheme?: Theme) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme ?? ThemeProps.light;

    const storedTheme = localStorage.getItem(ThemeProps.key) as Theme | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? ThemeProps.dark
      : ThemeProps.light;

    return storedTheme || defaultTheme || systemTheme;
  });

  const isDark = useMemo(() => {
    return theme === ThemeProps.dark;
  }, [theme]);

  const isLight = useMemo(() => {
    return theme === ThemeProps.light;
  }, [theme]);

  const _setTheme = (theme: Theme) => {
    localStorage.setItem(ThemeProps.key, theme);
    document.documentElement.classList.remove(
      ThemeProps.light,
      ThemeProps.dark,
    );
    document.documentElement.classList.add(theme);
    setTheme(theme);
  };

  const setLightTheme = () => _setTheme(ThemeProps.light);

  const setDarkTheme = () => _setTheme(ThemeProps.dark);

  const toggleTheme = () =>
    theme === ThemeProps.dark ? setLightTheme() : setDarkTheme();

  useEffect(() => {
    _setTheme(theme);
  }, [theme]);

  // Initialize theme on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem(ThemeProps.key) as Theme | null;

    if (!storedTheme) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? ThemeProps.dark
        : ThemeProps.light;

      _setTheme(systemTheme);
    }
  }, []);

  return { theme, isDark, isLight, setLightTheme, setDarkTheme, toggleTheme };
};
