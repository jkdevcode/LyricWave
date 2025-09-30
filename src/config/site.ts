export type SiteConfig = typeof siteConfig;
import i18next from "../i18n";

export const siteConfig = () => ({
  needCookieConsent: true, // Set to false if you don't need cookie consent
  name: i18next.t("vite-heroui"),
  description: i18next.t(
    "make-beautiful-websites-regardless-of-your-design-experience",
  ),
  links: {
    github: "https://github.com/jkdevcode",
    linkedin: "https://www.linkedin.com/in/dario-jose-zamora-vargas-32b9aa318",
    email: "mailto:dajozavargas@gmail.com",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://github.com/sponsors/sctg-development",
  },
});
