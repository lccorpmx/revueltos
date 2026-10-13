import { Fragment } from "react";
import { SOCIAL_ICONS } from "@/components/brand/icons";
import { Logo } from "@/components/brand/logo";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-night text-white">
      <div className="container-page grid items-center gap-10 py-14 md:grid-cols-[auto_1fr_auto] md:gap-8 md:py-16">
        <a href="#inicio" className="justify-self-center rounded-xl md:justify-self-start">
          <Logo tone="white" withTagline />
          <span className="sr-only">, volver al inicio</span>
        </a>

        <nav aria-label="Pie de página" className="justify-self-center">
          <ul className="flex flex-wrap items-center justify-center gap-x-3 text-[0.95rem] text-white/85 sm:gap-x-0">
            {siteConfig.nav.map((item, i) => (
              <Fragment key={item.id}>
                {i > 0 && (
                  <li aria-hidden="true" className="hidden px-1 text-white/40 sm:block">
                    |
                  </li>
                )}
                <li>
                  <a href={`#${item.id}`} className="inline-flex h-11 items-center rounded-full px-2 transition-colors hover:text-sun">
                    {item.label}
                  </a>
                </li>
              </Fragment>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
          <ul className="flex items-center gap-1">
            {siteConfig.socials.map(({ network, href }) => {
              const Icon = SOCIAL_ICONS[network];
              return (
                <li key={network}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Revueltos en ${network}`}
                    className="grid size-11 place-items-center rounded-full transition-[color,transform] duration-200 hover:-translate-y-0.5 hover:text-sun"
                  >
                    <Icon className="size-6" />
                  </a>
                </li>
              );
            })}
          </ul>
          <Separator orientation="vertical" className="hidden h-12 bg-white/25 sm:block" />
          <p className="text-center text-sm leading-snug whitespace-nowrap text-white/85 sm:text-left">
            <a
              href="https://founder.com.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm underline-offset-4 transition-colors hover:text-sun hover:underline"
            >
              developed by founder
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-page py-6 text-center text-xs text-white/60">
          © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.tagline}
        </p>
      </div>
    </footer>
  );
}
