# Design

## Visual Theme

**Editorial de moda en blanco y negro.** La referencia es una portada de Vogue o Harper's Bazaar: negro sobre blanco, serif de altísimo contraste a tamaño enorme, composición asimétrica y fotografía a sangre.

El tema es claro, no oscuro. La escena que lo decide: una mujer mirando el móvil en la cola del súper de Rivas, a media tarde, con la pantalla al 60% de brillo. Necesita leer un precio y pulsar un botón. Un fondo negro a pleno sol es peor, y esta marca vive de que las fotos de uñas se lean con fidelidad de color, cosa que el blanco favorece.

El ritmo se rompe con **una sección invertida a negro pleno** (la galería). No es decoración: el color de las uñas revienta sobre negro, y la inversión marca el cambio de registro entre "lo que cuesta" y "lo que hace".

## Color

Estrategia: **Restrained**. Monocromo tintado más un acento de menos del 5%. La página no compite con las fotos, las enmarca.

Ningún negro ni blanco puros. Todos los neutros llevan una traza de rosa (hue 350) tomada del propio material fotográfico: a simple vista se lee como blanco y negro, pero evita el gris digital barato.

```css
--tinta:        oklch(0.145 0.006 350);  /* negro de imprenta, texto y fondos invertidos */
--tinta-media:  oklch(0.32  0.005 350);  /* texto sobre fondo oscuro, jerarquía secundaria */
--grafito:      oklch(0.52  0.004 350);  /* texto secundario. 5.3:1 sobre papel */
--linea:        oklch(0.88  0.004 350);  /* divisorias decorativas */
--borde:        oklch(0.62  0.004 350);  /* bordes de controles. 3:1, cumple AA no textual */
--papel-hueso:  oklch(0.965 0.003 350);  /* fondos alternos, apenas perceptible */
--papel:        oklch(0.985 0.002 350);  /* fondo principal */
--laca:         oklch(0.55  0.19  25);   /* rojo esmalte. 4.65:1 sobre papel */
--abierto:      oklch(0.55  0.13  150);  /* estado "abierto ahora". 4.6:1 */
```

Los dos únicos colores con croma real, y ambos se usan con cuentagotas.

`--laca` es el rojo del esmalte clásico, no un acento arbitrario. `--abierto` marca el estado del salón: verde apagado, no de semáforo. El rojo se probó ahí y se descartó, porque un punto rojo junto a "Abierto ahora" contradice al propio texto. Cuando el salón está cerrado, el punto es gris en lugar de rojo: informa sin alarmar.

El mapa incrustado va en escala de grises. Es la única imagen de la página que se desatura, y procede: el color aquí está reservado a las fotos del trabajo, y los verdes y amarillos de Google romperían la paleta entera.

El verde corporativo de WhatsApp queda prohibido en la interfaz. El botón de reserva es negro sobre blanco; el icono de WhatsApp aparece monocromo dentro del botón.

## Typography

Dos familias, ambas autoalojadas mediante Fontsource. Nada de Google Fonts por CDN: es una fuga de datos personales a un tercero y en España tiene consecuencias legales bajo el RGPD.

**Display: Bodoni Moda Variable.** Serif didona de altísimo contraste, la familia tipográfica de la prensa de moda desde hace dos siglos. No es una elección estética arbitraria: la marca de agua que Nanci lleva años estampando en sus fotos ya es una didona fina en blanco. Se formaliza lo que ya existe.

**Texto: Jost Variable.** Geométrica derivada de Futura, la tipografía histórica de la cosmética (Dior, Calvin Klein). Neutra, muy legible en móvil, y su frialdad geométrica equilibra el dramatismo de la Bodoni.

Escala fluida, ratio mínimo 1.25 entre pasos:

```css
--texto-xs:      0.75rem;                                    /* etiquetas, tracking amplio */
--texto-sm:      0.875rem;
--texto-base:    1.0625rem;                                  /* 17px, cuerpo cómodo en móvil */
--texto-lg:      clamp(1.25rem, 1.1rem + 0.6vw,  1.5rem);
--texto-xl:      clamp(1.75rem, 1.4rem + 1.5vw,  2.5rem);
--texto-2xl:     clamp(2.5rem,  1.8rem + 3.2vw,  4rem);
--texto-3xl:     clamp(3.5rem,  2rem   + 7vw,    7rem);
--texto-display: clamp(3.75rem, 1rem   + 14vw,   12rem);
```

Reglas:

- Cuerpo de texto limitado a 65ch.
- Bodoni solo a partir de `--texto-xl`. A tamaño pequeño su contraste de trazo se rompe y pierde legibilidad.
- Las etiquetas en versalitas con `letter-spacing: 0.18em` se reservan para el catálogo de servicios. No se repiten como encabezado de cada sección: eso es andamiaje de plantilla.
- Nunca cuerpo de texto en mayúsculas.

## Layout

**Rejilla de 12 columnas, composición asimétrica.** El centrado sistemático es lo que hace que una página parezca plantilla.

- Hero: el titular ocupa las columnas 1 a 7 y desborda el margen izquierdo; la fotografía ocupa de la 8 a la 12 a sangre por el borde derecho y superior.
- Servicios: dos columnas desiguales. Nombre y descripción a la izquierda, duración y precio alineados a la derecha sobre una línea de puntos, como una carta de restaurante.
- Galería: mosaico de alturas variables sobre fondo negro. Todas las fotos comparten relación 4:5, así que la variación viene del ancho de celda, no de recortes distintos.
- Sin tarjetas. En ningún sitio. Las tarjetas son la respuesta perezosa y aquí no son la mejor forma de nada.

Espaciado fluido con `clamp()`, variando el ritmo: separaciones amplias entre secciones, agrupaciones apretadas dentro de cada una.

## Components

- **Botón de reserva**: fondo `--tinta`, texto `--papel`, sin radio de esquina (el rectángulo puro es más editorial), icono de WhatsApp monocromo. Estado de foco con contorno desplazado, nunca `outline: none`.
- **Fila de servicio**: nombre en Jost 500, descripción en `--grafito`, línea de puntos flexible, duración y precio en Bodoni. Sin caja, sin fondo, sin borde lateral de color.
- **Pieza de galería**: fotografía a 4:5 con texto alternativo descriptivo real. Sin superposición de texto, sin marco. La marca de agua original de Nanci se conserva: es suya y protege su trabajo.
- **Logo**: componente aislado en `src/components/Logo.astro`. Ahora mismo es una marca tipográfica en Bodoni. La dueña aporta el logotipo definitivo, y se sustituye en ese único archivo.

## Motion

Discreta y orquestada, nunca decorativa.

- Revelado al entrar en pantalla mediante animaciones CSS ligadas al scroll (`animation-timeline: view()`), sin JavaScript. Si el navegador no lo soporta, el contenido aparece visible sin más.
- Curva de salida exponencial (`cubic-bezier(0.16, 1, 0.3, 1)`). Sin rebote, sin elástico.
- Nunca se animan propiedades de layout. Solo `opacity`, `transform` y `filter`.
- `prefers-reduced-motion: reduce` desactiva todo movimiento de entrada.
