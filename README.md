# Revueltos · Landing page

Landing de **Revueltos — un desayuno de huevos**. Next.js 16 (App Router + Turbopack), React 19,
Tailwind CSS v4, shadcn/ui (Radix) y `motion` para la animación con scroll.

```bash
npm run dev     # http://localhost:3000
npm run build   # build de producción (la página se genera estática)
npm run start
```

## Estructura

```
app/                      layout (fuentes, metadata), página, estilos globales y favicon
components/
  sections/               hero, menú, "capa por capa", por qué, historia, CTA
  site/                   header (scroll-spy + menú móvil con Sheet) y footer
  mascot/                 piezas SVG de la mascota y sus escenas animadas
  hero/hero-sandwich.tsx  salsa + ajonjolí al cargar
  decor/                  olas, subrayados, huevos estrellados, íconos ilustrados
  brand/                  logo e íconos (moto, redes, pin)
  motion/                 <Reveal> y <AnimatedScene> (pausa animaciones fuera de pantalla)
  ui/                     componentes de shadcn/ui
lib/
  site.ts                 nombre, navegación y links (pedidos, mapa, redes)
  menu.ts                 platillos y precios
  timeline.ts             helpers para coreografías CSS escritas en segundos
  sandwich-data.ts        capas, trayectoria de la salsa y semillas (generado)
```

## Animaciones

- **Mascotas** (`components/mascot/*-scene.tsx`): cada escena es SVG + keyframes CSS generados desde
  una línea de tiempo en segundos (`lib/timeline.ts`). No corre JavaScript por frame; todas las piezas
  comparten el mismo ciclo, así que se mantienen sincronizadas.
  - Hero: el malabarista avienta el huevo, lo cacha dos veces, a la tercera se le cae (¡crack!) y saca
    otro de la gorra; el mirón sigue cada lanzamiento con los ojos.
  - ¿Por qué?: el huevo en su mano tiembla, se rompe y sale un pollito que se sube a la gorra y se va volando.
  - Historia: foto "viva" en la polaroid que saluda y presume su huevo.
  - CTA: camina equilibrando un huevo en la gorra y casi se le cae.
- **Sándwich del hero**: al cargar, una botella recorre la forma real de la salsa (máscara SVG + Web
  Animations API) y después un salero suelta ~100 semillas que caen en su lugar.
- **Capa por capa**: las capas recortadas del sándwich desglosado se arman con el scroll (`useScroll`);
  las semillas se mueven con una sola variable CSS.
- Accesibilidad: con `prefers-reduced-motion` todo queda en su pose final estática, y las escenas se
  pausan cuando salen de pantalla.

## Pendientes antes de publicar

- `lib/site.ts`: link real de pedidos (`links.order`), ficha de Google Maps y redes sociales.
- `public/images/menu/*` y `public/images/historia/*` son recortes del mockup en baja resolución:
  reemplázalos por fotos reales con el mismo nombre de archivo.
- `public/images/sandwich/*` y `lib/sandwich-data.ts` salen de la foto del sándwich desglosado; si cambia
  la foto hay que volver a recortar las capas.
