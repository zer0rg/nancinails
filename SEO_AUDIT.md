# Auditoría SEO técnica y local — Nanci Nails

Fecha: 26 de agosto de 2026  
Ámbito: repositorio Astro, salida estática `dist/` y respuestas HTTP públicas de
`https://nancinails.es`.

## Resumen por prioridad

| Prioridad | Estado | Hallazgo |
|---|---|---|
| P0 | `OWNER_VERIFICATION_REQUIRED` | Los 13 precios visibles de `src/data/servicios.ts` están declarados como referencias de mercado, no como tarifas confirmadas del salón. No se publican en JSON-LD, pero siguen visibles en HTML. |
| P0 | `OWNER_VERIFICATION_REQUIRED` | Seis duraciones se contradicen entre la tabla y el contenido. No se ha elegido una cifra ni cambiado información comercial. |
| P1 | Corregido | El sitemap incluía tres páginas con `noindex`. Ahora solo contiene la Home y las tres páginas de servicio canónicas. |
| P1 | Corregido | `NailSalon` no tenía `@id`; cada `Service` describía otro proveedor. Ahora existe una entidad única `https://nancinails.es/#nanci-nails`. |
| P1 | Corregido | `priceRange: "€€"` y áreas servidas no confirmadas se publicaban como hechos. Se han retirado; `areaServed` queda limitado a Rivas-Vaciamadrid. |
| P1 | Pendiente externo | `www.nancinails.es` no resuelve por DNS. Debe añadirse al proyecto de Vercel y redirigirse al dominio sin `www`. |
| P1 | `OWNER_VERIFICATION_REQUIRED` | La política de privacidad heredada declara IONOS, Mailchimp, Analytics, DoubleClick, AdSense y formularios que el código actual no utiliza. Requiere revisión legal/humana. |
| P1 | `OWNER_VERIFICATION_REQUIRED` | Hay afirmaciones categóricas sobre uñas encarnadas, durezas, callos, daño y recuperación de la uña. Se detallan más abajo; no se han reescrito automáticamente. |
| P2 | Corregido | Se emitía `FAQPage` aunque Google no muestra normalmente este rich result para un salón local. Las FAQs se conservan en HTML semántico y se elimina markup innecesario. |
| P2 | Corregido | Cuatro imágenes de galería fuera del pliegue se cargaban con `eager`. Ahora solo el hero/LCP es eager y lleva prioridad alta. |
| P2 | Corregido | Los metadatos estaban centralizados parcialmente en el layout, pero no permitían configurar canonical, imagen u `og:type`. `SEO.astro` expone esos campos sin duplicados. |
| P2 | Correcto | `?n=...` devuelve la Home con canonical y `og:url` limpios; esos parámetros no aparecen en el sitemap. |
| P3 | `OWNER_VERIFICATION_REQUIRED` | La marca tipográfica y los favicon son provisionales. No se declara `logo` en Schema.org hasta disponer de un archivo oficial. |

## Estado técnico final

### Política de URL

- Protocolo y host canónico: `https://nancinails.es`.
- Rutas: barra final obligatoria; Vercel responde 308 desde la variante sin barra.
- Cada página indexable tiene un único canonical absoluto autorreferente.
- Los parámetros irrelevantes no cambian el canonical.
- Las páginas legales y la 404 usan `noindex, follow` y no aparecen en el sitemap.
- La variante `www` requiere la acción externa indicada al final.

### Páginas indexables y metadata

| URL | Title | Description | Canonical | H1 | Schema |
|---|---|---|---|---|---|
| `/` | Nanci Nails · Manicura y pedicura en Rivas Vaciamadrid | Centro de manicura y pedicura en el C.C. Santa Mónica de Rivas Vaciamadrid. Esmaltado permanente, uñas de gel, diseño y cita por WhatsApp. | `https://nancinails.es/` | Las manos hablan antes que tú | `NailSalon` |
| `/manicura-rivas-vaciamadrid/` | Manicura en Rivas Vaciamadrid · Nanci Nails | Manicura express, spa y esmaltado permanente en el C.C. Santa Mónica de Rivas Vaciamadrid. Consulta precios y pide cita por WhatsApp. | `https://nancinails.es/manicura-rivas-vaciamadrid/` | Manicura en Rivas Vaciamadrid | `NailSalon`, `BreadcrumbList`, `Service` |
| `/pedicura-rivas-vaciamadrid/` | Pedicura en Rivas Vaciamadrid · Nanci Nails | Pedicura spa y con esmaltado permanente en el C.C. Santa Mónica de Rivas Vaciamadrid. Consulta precios y pide cita por WhatsApp. | `https://nancinails.es/pedicura-rivas-vaciamadrid/` | Pedicura en Rivas Vaciamadrid | `NailSalon`, `BreadcrumbList`, `Service` |
| `/unas-de-gel-rivas-vaciamadrid/` | Uñas de gel en Rivas Vaciamadrid · Nanci Nails | Uñas esculpidas en gel, relleno y retirada en el C.C. Santa Mónica de Rivas Vaciamadrid. Consulta precios y pide cita por WhatsApp. | `https://nancinails.es/unas-de-gel-rivas-vaciamadrid/` | Uñas de gel en Rivas Vaciamadrid | `NailSalon`, `BreadcrumbList`, `Service` |

Las páginas indexables no necesitan una meta `robots`: la ausencia equivale a
`index, follow`. Open Graph incluye título, descripción, URL, imagen, tipo y
`es_ES`; Twitter incluye `summary_large_image`, título, descripción e imagen.

### Datos estructurados

Se usa `NailSalon`, subtipo específico y válido de `LocalBusiness`. La entidad
incluye datos verificables: nombre, URL, teléfono, email, dirección, horarios,
imagen, redes oficiales y área servida. Cada servicio referencia el mismo salón
mediante:

```json
"provider": {
  "@id": "https://nancinails.es/#nanci-nails"
}
```

No se publican `Offer`, `priceRange`, `aggregateRating`, `review`, `geo` ni
`logo`: los datos disponibles son provisionales, inexistentes o no confirmados.

### Sitemap y robots

- Sitemap real: `https://nancinails.es/sitemap-index.xml`.
- El índice apunta a `sitemap-0.xml`.
- `sitemap-0.xml` contiene exactamente las cuatro URLs indexables de la tabla.
- `robots.txt` permite el rastreo público y señala el índice correcto.
- En previews, el sitemap queda vacío, el robots bloquea el rastreo y el HTML
  lleva `noindex`.

### HTML, accesibilidad y rendimiento

- Una etiqueta H1 por página y jerarquía H2/H3/H4 coherente.
- `header`, `nav`, `main` y `footer` presentes; navegación con enlaces reales.
- El enlace «Saltar al contenido» apunta a `#contenido` en todas las páginas.
- Foco visible global y objetivos táctiles amplios.
- En móvil no hay menú hamburguesa: la navegación de cabecera se oculta, pero
  las landings siguen accesibles desde tarifas y footer. Revisar con datos de UX
  antes de introducir un patrón visual nuevo.
- El LCP probable de Home es `src/assets/hero.jpg`: no usa lazy-load, incluye
  `fetchpriority="high"`, `srcset`, `sizes`, `width` y `height`.
- El resto de imágenes usa lazy-load, dimensiones y `decoding="async"` generados
  por Astro. Los alt describen el trabajo fotografiado.
- No hay directivas `client:*`, frameworks hidratados ni bundles JavaScript.
- Bodoni Moda y Jost están autoalojadas y declaran `font-display: swap`.
- Google Maps no recibe `src` antes del consentimiento y siempre existe un
  enlace HTML normal a Maps.

## Consolidación de la migración

La intención antigua se documentó en `SEO.md` a partir del WordPress previo. Las
URLs locales se conservan hacia la landing equivalente; las páginas genéricas
se consolidan en la sección relevante de Home.

| URL antigua | Destino | Status esperado | Motivo |
|---|---|---:|---|
| `/centro-de-manicura-en-rivas-vaciamadrid/` | `/manicura-rivas-vaciamadrid/` | 301 | Servicio equivalente |
| `/mejor-centro-de-manicura-en-rivas-vaciamadrid/` | `/manicura-rivas-vaciamadrid/` | 301 | Misma intención local |
| `/centro-de-pedicura-en-rivas-vaciamadrid/` | `/pedicura-rivas-vaciamadrid/` | 301 | Servicio equivalente |
| `/diseno-de-unas-de-gel-en-rivas-vaciamadrid/` | `/unas-de-gel-rivas-vaciamadrid/` | 301 | Servicio equivalente más próximo |
| `/thecolouredclap-com-cc-comercial-santa-monica-rivas-vaciamadrid/` | `/#donde` | 301 | El contenido antiguo trataba la ubicación |
| `/servicios/` | `/#tarifas` | 301 | Catálogo consolidado en Home |
| `/nuestras-ofertas/` | `/#tarifas` | 301 | Contenido comercial consolidado |
| `/galerias/` | `/#trabajos` | 301 | Galería consolidada |
| `/instagram/` | `/#trabajos` | 301 | Trabajos y perfil oficial |
| `/contacta/` | `/#donde` | 301 | Ubicación y contacto visibles |
| `/personalizar-cookies/` | `/politica-de-cookies/` | 301 | Equivalente funcional |

Cada origen se contempla con y sin barra para evitar cadenas durante la
migración. Los fragments no crean documentos indexables nuevos: la URL canónica
de destino sigue siendo la Home.

Las rutas `/testimonials/`, `/our-clients/`, `/trabaja-con-nosotros/`, `/feed/`,
`/comments/feed/` y `/wp-json/*` no tienen contenido equivalente en la web actual.
Se dejan devolver 404 real en vez de redirigirlas de forma irrelevante a Home,
lo que reduciría el riesgo de soft 404.

Las URLs `/?n=538760316` y `/?n=747075016` responden 200 con canonical a `/`.
No se incluyen en enlaces internos ni sitemap. Si Search Console demuestra un
volumen relevante, puede añadirse una regla Vercel específica que elimine `n`;
no es necesaria para declarar la canónica actual.

## OWNER_VERIFICATION_REQUIRED

### Tarifas

Todos los servicios de `src/data/servicios.ts:49-163` tienen
`provisional: true`; el propio archivo declara que son precios de referencia del
mercado. Confirmar los 13 servicios antes de tratar el catálogo como tarifa real.
Hasta entonces no se generan `Offer` ni `priceRange`.

### Duraciones contradictorias

| Servicio | Tabla | Texto | Referencias |
|---|---:|---:|---|
| Manicura express | 30 min | 25 min | `src/data/servicios.ts:52`; `src/data/paginasServicio.ts:131` |
| Manicura spa | 1 h | 45 min | `src/data/servicios.ts:59`; `src/data/paginasServicio.ts:131` |
| Uñas esculpidas en gel | 1 h 30 min | unas 2 h | `src/data/servicios.ts:87`; `src/data/paginasServicio.ts:251,290` |
| Retirada de gel | 15 min | 30 min | `src/data/servicios.ts:101`; `src/data/paginasServicio.ts:265,285,290` |
| Pedicura spa | 1 h | 50 min | `src/data/servicios.ts:115`; `src/data/paginasServicio.ts:162,209` |
| Pedicura con permanente | 45 min | 65 min | `src/data/servicios.ts:122`; `src/data/paginasServicio.ts:209` |

No se ha elegido una fuente de verdad porque ambas aparecen publicadas como
datos comerciales. Cuando la dueña confirme cada duración, debe actualizarse
`servicios.ts` y derivar cualquier mención visible de esa fuente.

### Afirmaciones de salud o fisiología

Revisar con una profesional cualificada o formular con cautela:

| Referencia | Riesgo | Formulación prudente orientativa |
|---|---|---|
| `src/data/paginasServicio.ts:94,107` | Garantiza ausencia de daño/levantamiento | «Una aplicación y retirada cuidadosas ayudan a minimizar el daño; el resultado varía según la uña y los hábitos.» |
| `src/data/paginasServicio.ts:162` | Atribuye la mayoría de molestias a durezas y afirma prevenir uñas encarnadas | «El limado recto puede ayudar a reducir el riesgo; ante dolor, inflamación o lesión, consulta a podología.» |
| `src/data/paginasServicio.ts:169-171,204` | Afirma el origen de las durezas, frenar grietas y que la cuchilla engrosa el callo | Describir la técnica elegida y el confort buscado sin atribuir un efecto fisiológico universal. |
| `src/data/paginasServicio.ts:185` | Garantiza que una frecuencia evita recurrencias | «La frecuencia de mantenimiento depende del estado del pie y de los hábitos.» |
| `src/data/paginasServicio.ts:249,259` | «Se parte sí o sí» y mantenimiento durante años sin descanso | Sustituir absolutos por riesgos y condicionar a la evaluación de la uña natural. |
| `src/data/paginasServicio.ts:266,285,295` | Plazo fijo de recuperación y mantenimiento indefinido | Evitar diagnosticar; indicar que el crecimiento y la recuperación varían y derivar molestias persistentes. |

No se han cambiado estos textos, conforme a la instrucción de no alterar
automáticamente afirmaciones comerciales discutibles.

### Privacidad, marca e imágenes

- Revisar `src/pages/politica-de-privacidad.astro:109,160,190,268,318-409`:
  declara tratamientos y proveedores ausentes en el código actual.
- Confirmar que las cinco fotografías marcadas como `gel` en
  `src/data/galeria.ts:62,76,97,118,149` corresponden realmente a esa técnica.
- Aportar más fotografías de pedicura: hoy solo hay una y la landing omite el
  mosaico para no etiquetar manos como pies.
- Aportar logotipo/favicon oficiales antes de añadir `logo` a JSON-LD.
- Confirmar `priceRange`, coordenadas y ficha oficial de Google Business Profile
  antes de añadirlos a datos estructurados.

## Validación ejecutada

| Comprobación | Resultado |
|---|---|
| `npm run build` antes de los cambios | Correcto; 8 páginas generadas |
| `npm run build` después de los cambios | Correcto; 8 páginas generadas |
| `npx astro check` | 0 errores, 0 advertencias, 0 sugerencias |
| HTML final de las 4 URLs indexables | Un `title`, una description, un canonical absoluto y un H1 por página |
| JSON-LD parseado desde `dist/` | Válido; `NailSalon` en las cuatro páginas y `Service` + `BreadcrumbList` en cada servicio |
| Marcado sensible | Sin `FAQPage`, `Offer`, `priceRange`, ratings, coordenadas ni logo no confirmado |
| Sitemap final | Solo 4 URLs canónicas, indexables y con salida HTML 200 esperada |
| Rastreo local de `dist/` | 8 HTML; 0 enlaces internos, anclas o recursos locales rotos |
| 404 y legales | `noindex, follow`; sin datos estructurados de negocio |
| `git diff --check` | Correcto, sin errores de espacios |

No existen scripts `lint` o `test` adicionales en `package.json`. La comprobación
de tipos y plantillas Astro se ejecutó explícitamente con `astro check`.

En producción, antes del despliegue de estos cambios, se verificaron respuestas
reales para Home, parámetros `?n=...`, redirects legacy, canonicalización HTTPS y
slash final, `robots.txt`, sitemap, imagen OG y un 404 aleatorio. Los cambios de
`vercel.json` que convierten rutas técnicas irrelevantes en 404 surtirán efecto
solo tras el siguiente despliegue.

## Comprobaciones externas necesarias

1. En Vercel → Project Settings → Domains, añadir `www.nancinails.es`, crear su
   DNS y configurarlo como redirect permanente a `nancinails.es`.
2. En Google Search Console, enviar `https://nancinails.es/sitemap-index.xml`,
   inspeccionar las cuatro canónicas y solicitar reindexación.
3. Revisar durante 4–8 semanas «Páginas», «Sitemaps» y las URLs antiguas para
   confirmar 301→200 sin cadenas.
4. Verificar Google Business Profile: categoría, NAP, horarios, URL y fotos.
5. Exportar consultas reales antes de decidir nuevas landings; ver
   `SEO_OPPORTUNITIES.md`.

## Referencias técnicas consultadas

- Astro: routing, componentes, imágenes y `@astrojs/sitemap`.
- Google Search Central: canonicalización, LocalBusiness, Breadcrumb y políticas
  generales de datos estructurados.
- Google Search Central: cambio de visibilidad de rich results FAQ.
- Schema.org: `NailSalon`, subtipo de `HealthAndBeautyBusiness` y
  `LocalBusiness`.
- Vercel: redirects, `trailingSlash` y configuración de dominios.
