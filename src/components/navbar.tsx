import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";

import LyricSwitch from "./lyric-switch";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { ThemeColorSwitch } from "@/components/theme-switch-color";
import { GithubIcon } from "@/components/icons";
import { Logo } from "@/components/icons";

export const Navbar = () => {
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
          <Link isExternal href={siteConfig().links.github} title="github">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeColorSwitch />
          <ThemeSwitch />
          <LyricSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <div className="flex items-center justify-between px-4 py-2 mt-4">
            <span className="text-tiny text-default-400 uppercase font-bold tracking-widest">
              Personalization
            </span>
            <div className="flex items-center gap-4">
              <ThemeColorSwitch />
              <ThemeSwitch />
              <LyricSwitch />
            </div>
          </div>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            isExternal
            className="flex items-center gap-2 px-4 py-2 text-default-500"
            href={siteConfig().links.github}
          >
            <GithubIcon size={24} />
            Github
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
