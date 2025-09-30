import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { useTranslation } from "react-i18next";

/* import { I18nIcon, LanguageSwitch } from "./language-switch"; */

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon } from "@/components/icons";
import { Logo } from "@/components/icons";
/* import { availableLanguages } from "@/i18n"; */

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit">DJDEV</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig().links.github} title={t("github")}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          {/* <LanguageSwitch
            availableLanguages={availableLanguages}
            icon={I18nIcon}
          /> */}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig().links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        {/* <LanguageSwitch
          availableLanguages={availableLanguages}
          icon={I18nIcon}
        /> */}
        <NavbarMenuToggle />
      </NavbarContent>
    </HeroUINavbar>
  );
};
