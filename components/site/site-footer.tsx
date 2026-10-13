import { Fragment } from "react";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/brand/icons";
import { Logo } from "@/components/brand/logo";
import { HeartDoodle } from "@/components/decor/doodles";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/site";

const SOCIALS = [
  { label: "Instagram", href: siteConfig.links.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.links.facebook, Icon: FacebookIcon },
  { label: "TikTok", href: siteConfig.links.tiktok, Icon: TikTokIcon },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-night text-white">
      <div className="container-page grid items-center gap-8 py-10 md:grid-cols-[auto_1fr_auto] md:gap-6">
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
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Revueltos en ${label}`}
                  className="grid size-11 place-items-center rounded-full transition-[color,transform] duration-200 hover:-translate-y-0.5 hover:text-sun"
                >
                  <Icon className="size-6" />
                </a>
              </li>
            ))}
          </ul>
          <Separator orientation="vertical" className="hidden h-12 bg-white/25 sm:block" />
          <p className="max-w-[9.5rem] text-center text-sm leading-snug text-white/85 sm:text-left">
            Desayunos que te ponen de buenas.
            <HeartDoodle filled className="ml-1.5 inline-block size-4 text-white" />
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-page py-5 text-center text-xs text-white/60">
          © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.tagline}
        </p>
      </div>
    </footer>
  );
}
