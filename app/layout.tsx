import type { Metadata, Viewport } from "next";
import { Gochi_Hand, Nunito, Shantell_Sans } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const shantell = Shantell_Sans({
  variable: "--font-shantell",
  subsets: ["latin"],
  display: "swap",
});

const gochi = Gochi_Hand({
  variable: "--font-gochi",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} · ${siteConfig.slogan}`,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["desayunos", "huevos", "sándwiches", "chilaquiles", "omelette", "comida mexicana"],
  openGraph: {
    title: `${siteConfig.name} · ${siteConfig.slogan}`,
    description: siteConfig.description,
    type: "website",
    locale: "es_MX",
    siteName: siteConfig.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#fddf3b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-MX"
      className={`${nunito.variable} ${shantell.variable} ${gochi.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#contenido"
          className="sr-only z-100 rounded-full bg-ink px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
