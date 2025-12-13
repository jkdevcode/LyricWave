import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

export const ThemeProps = {
  key: "theme",
  light: "light",
  dark: "dark",
} as const;

export type Theme = typeof ThemeProps.light | typeof ThemeProps.dark;

interface ThemeContextProps {
  theme: Theme;
  isDark: boolean;
  isLight: boolean;
  setLightTheme: () => void;
  setDarkTheme: () => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return ThemeProps.light;

    const storedTheme = localStorage.getItem(ThemeProps.key) as Theme | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? ThemeProps.dark
      : ThemeProps.light;

    return storedTheme || systemTheme;
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

  const value = useMemo(
    () => ({
      theme,
      isDark,
      isLight,
      setLightTheme,
      setDarkTheme,
      toggleTheme,
    }),
    [theme, isDark, isLight],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
