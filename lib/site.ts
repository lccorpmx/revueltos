export const siteConfig = {
  name: "Revueltos",
  tagline: "Un desayuno de huevos",
  slogan: "Desayunos que te ponen de buenas",
  description:
    "Huevos, sándwiches y más, con ingredientes frescos y mucho sabor mexicano. Visítanos u ordena en línea.",
  links: {
    // TODO: reemplazar por el link real de pedidos (app de delivery, WhatsApp, etc.).
    // Mientras tanto lleva a la sección "Visítanos u ordena en línea".
    order: "#ubicacion",
    // TODO: reemplazar por la ficha real de Google Maps.
    maps: "https://www.google.com/maps/search/?api=1&query=Revueltos%20desayunos",
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    tiktok: "https://www.tiktok.com/",
  },
  nav: [
    { id: "inicio", label: "Inicio" },
    { id: "menu", label: "Menú" },
    { id: "historia", label: "Nuestra Historia" },
    { id: "ubicacion", label: "Ubicación" },
  ],
} as const;

export type SectionId = (typeof siteConfig.nav)[number]["id"];

/** Opens external links in a new tab; keeps in-page anchors in place. */
export function linkProps(href: string) {
  return href.startsWith("http")
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };
}
