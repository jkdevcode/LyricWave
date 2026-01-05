import { createContext, useContext, useState, ReactNode } from "react";

type LyricMode = "phrases" | "words";

interface LyricModeContextType {
  mode: LyricMode;
  toggleMode: () => void;
  setMode: (mode: LyricMode) => void;
}

const LyricModeContext = createContext<LyricModeContextType | undefined>(
  undefined,
);

export const LyricModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<LyricMode>("phrases");

  const toggleMode = () => {
    setMode((prev) => (prev === "phrases" ? "words" : "phrases"));
  };

  return (
    <LyricModeContext.Provider value={{ mode, toggleMode, setMode }}>
      {children}
    </LyricModeContext.Provider>
  );
};

export const useLyricMode = () => {
  const context = useContext(LyricModeContext);

  if (!context) {
    throw new Error("useLyricMode must be used within a LyricModeProvider");
  }

  return context;
};
