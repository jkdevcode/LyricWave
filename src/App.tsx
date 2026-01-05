import { Route, Routes } from "react-router-dom";
import { CookieConsentProvider } from "./contexts/cookie-consent-context";
import { LyricModeProvider } from "./contexts/lyric-mode";
import { CookieConsent } from "./components/cookie-consent";
import { PageNotFound } from "./pages/404";
import IndexPage from "@/pages/index";
import "./App.css";

function App() {
  return (
    <CookieConsentProvider>
      <LyricModeProvider>
        <CookieConsent />
        <Routes>
          <Route element={<IndexPage />} path="/" />
          <Route element={<PageNotFound />} path="*" />
        </Routes>
      </LyricModeProvider>
    </CookieConsentProvider>
  );
}

export default App;
