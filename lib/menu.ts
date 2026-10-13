export type MenuItem = {
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tag?: string;
};

export const menu: MenuItem[] = [
  {
    slug: "huevon",
    name: "El Huevón",
    description: "Huevo revuelto mexicano con sabores especiales, tocino y aguacate.",
    price: 65,
    image: "/images/menu/huevon.webp",
  },
  {
    slug: "huevudo",
    name: "El Huevudo",
    description: "Pan a la plancha con huevo, jamón, tomate, queso, lechuga, aguacate, cebolla y aderezos.",
    price: 75,
    image: "/images/menu/huevudo.webp",
  },
  {
    slug: "ahuevo-toast",
    name: "El Ahuevo Toast",
    description: "Estilo coreano. Pan brioche, huevo cremoso, tocino, aguacate, queso y aderezos.",
    price: 85,
    image: "/images/menu/ahuevo-toast.webp",
    tag: "Favorito",
  },
  {
    slug: "revueltos",
    name: "Revueltos",
    description: "3 huevos revueltos + 1 proteína + 1 porción de frijoles y totopos.",
    price: 55,
    image: "/images/menu/revueltos.webp",
  },
  {
    slug: "chilaquiles",
    name: "Chilaquiles",
    description: "Salsa verde, roja o picante + 1 proteína.",
    price: 55,
    image: "/images/menu/chilaquiles.webp",
  },
  {
    slug: "omelette",
    name: "Omelette",
    description: "3 huevos + 1 proteína + 1 porción de puré de papa.",
    price: 55,
    image: "/images/menu/omelette.webp",
  },
];

const mxn = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

/** "$65" — the mockup shows prices without the currency code. */
export function formatPrice(value: number) {
  return mxn.format(value).replace("MX", "");
}
