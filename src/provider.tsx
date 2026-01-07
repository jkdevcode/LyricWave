import type React from "react";
import type { NavigateOptions } from "react-router-dom";

import { HeroUIProvider } from "@heroui/system";
import { useHref, useNavigate } from "react-router-dom";

import { ThemeProvider } from "@/hooks/use-theme.tsx";
import { ColorThemeProvider } from "@/contexts/color-theme";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <ThemeProvider>
        <ColorThemeProvider>{children}</ColorThemeProvider>
      </ThemeProvider>
    </HeroUIProvider>
  );
}
