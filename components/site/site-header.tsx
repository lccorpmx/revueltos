"use client";

import { cn } from "cn";
import { ArrowRight, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { ScooterIcon } from "@/components/brand/icons";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { linkProps, siteConfig, type SectionId } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled ? "bg-cream/92 shadow-[0_3px_0_0_rgb(27_25_21/0.06)] backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="container-page flex h-(--header-h) items-center justify-between gap-4">
        <a href="#inicio" className="rounded-xl">
          <Logo />
          <span className="sr-only">, ir al inicio</span>
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1 lg:gap-4">
            {siteConfig.nav.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative inline-flex h-11 items-center rounded-full px-3 text-[0.95rem] font-semibold whitespace-nowrap text-ink/80 transition-colors hover:text-ink",
                      isActive && "text-ink",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 bottom-1.5 h-[3px] origin-left rounded-full bg-sun-deep transition-transform duration-300 ease-(--ease-out-soft)",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="sun" size="pill-sm" className="hidden sm:inline-flex">
            <a {...linkProps(siteConfig.links.order)}>
              <ScooterIcon className="size-5" />
              Ordena en línea
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </Button>
          <MobileMenu active={active} />
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ active }: { active: SectionId }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ink" size="icon-lg" className="size-11 lg:hidden" aria-label="Abrir menú">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[86%] max-w-sm gap-0 border-l-0 bg-cream p-0">
        <SheetHeader className="border-b border-border px-6 pt-6 pb-4">
          <SheetTitle className="sr-only">Menú</SheetTitle>
          <SheetDescription className="sr-only">Navega por las secciones de Revueltos</SheetDescription>
          <Logo />
        </SheetHeader>
        <nav aria-label="Menú móvil" className="px-4 py-4">
          <ul className="grid gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.id}>
                <SheetClose asChild>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? "location" : undefined}
                    className={cn(
                      "flex h-14 items-center rounded-2xl px-4 font-display text-xl font-extrabold text-ink transition-colors hover:bg-butter",
                      active === item.id && "bg-sun",
                    )}
                  >
                    {item.label}
                  </a>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto grid gap-3 p-6">
          <Button asChild variant="ink" size="pill">
            <a {...linkProps(siteConfig.links.order)}>
              <ScooterIcon className="size-5 text-sun" />
              Ordena en línea
            </a>
          </Button>
          <Button asChild variant="paper" size="pill">
            <a {...linkProps(siteConfig.links.maps)}>Encuentra nuestra ubicación</a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/** Scroll-spy: the nav section crossing a band near the middle of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<SectionId>("inicio");

  useEffect(() => {
    const sections = siteConfig.nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-42% 0px -56% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}
