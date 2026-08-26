# SEO — Nanci Nails

> Documento histórico de la migración desde WordPress (17 de agosto de 2026).
> La auditoría vigente del proyecto Astro está en `SEO_AUDIT.md`.

Auditoría de la web actual (`https://nancinails.es`, WordPress) y plan para que la
web nueva en Astro no solo **conserve** el posicionamiento en Rivas Vaciamadrid,
sino que lo mejore.

Escaneo realizado el **17 de agosto de 2026** sobre las 14 páginas indexables del
sitio en producción.

---

## 0. Lo primero: el riesgo que se come todo lo demás

> **Estado: resuelto.** Las 301 están en `vercel.json` y las tres páginas de
> servicio local existen (punto 5.2). Se deja escrito el razonamiento porque es
> lo que hay que volver a comprobar el día del cambio de DNS.

La web actual tiene **18 URLs en el sitemap**. La web nueva tenía **una sola
página**.

Cinco de esas URLs son páginas de aterrizaje local con el *keyword* metido en el
slug, y son casi con total seguridad las que hoy sostienen el posicionamiento
para "manicura en Rivas Vaciamadrid" y similares:

```
/centro-de-manicura-en-rivas-vaciamadrid/
/centro-de-pedicura-en-rivas-vaciamadrid/
/diseno-de-unas-de-gel-en-rivas-vaciamadrid/
/mejor-centro-de-manicura-en-rivas-vaciamadrid/
/thecolouredclap-com-cc-comercial-santa-monica-rivas-vaciamadrid/
```

Si el día del cambio esas URLs devuelven **404**, Google desindexa, la autoridad
acumulada durante cinco años se evapora y el negocio desaparece de la primera
página. No es un riesgo teórico: es el modo estándar de arruinar un rediseño.

**Sin el bloque de redirecciones 301 del punto 5.1, no se publica.** Todo lo
demás de este documento es mejora; eso es supervivencia.

---

## 1. Ficha técnica de la web actual

| Concepto | Valor |
|---|---|
| CMS | WordPress 7.0.4 |
| Tema | Divi Barber Theme v1.0.0 |
| Servidor | nginx + PHP 8.4.24 (Plesk) |
| Plugin SEO | **Ninguno** (sin Yoast, Rank Math, AIOSEO ni SEOPress) |
| Idioma | `<html lang="es">` ✅ |
| HTTPS | ✅ |
| Canonical | ✅ (el que pone WordPress de serie) |
| Páginas indexables | 14 |

### Rendimiento (portada)

| Métrica | Valor | Lectura |
|---|---|---|
| TTFB | 1,26 s | Malo. Google quiere < 0,8 s |
| Descarga total del HTML | 1,47 s | Malo |
| Peso del HTML | **348 KB** | Brutal para una página así |
| CSS en línea | **229 KB** | Prácticamente todo el HTML es CSS de Divi |
| Scripts externos | 18 | Incluye jQuery |
| Hojas de estilo | 9 | |

348 KB de HTML para una landing de un salón de uñas. Es un problema real de Core
Web Vitals y, en una web local donde el 70–80 % del tráfico es móvil, cuesta
conversiones antes incluso que posiciones.

---

## 2. Metadatos: lo que hay

### Títulos por página

| URL | `<title>` | Longitud |
|---|---|---|
| `/` | Nanci Nails \| Salón especializado en manicura y pedicura profesional | 68 |
| `/servicios/` | Servicios \| Nanci Nails | 23 |
| `/contacta/` | Contacta \| Nanci Nails | 22 |
| `/centro-de-manicura-en-rivas-vaciamadrid/` | **Manicura** \| Nanci Nails | 22 |
| `/centro-de-pedicura-en-rivas-vaciamadrid/` | **Pedicura** \| Nanci Nails | 22 |
| `/diseno-de-unas-de-gel-en-rivas-vaciamadrid/` | **Diseño de uñas** \| Nanci Nails | 28 |
| `/mejor-centro-de-manicura-en-rivas-vaciamadrid/` | Mejor centro de manicura en Rivas Vaciamadrid \| Nanci Nails | 59 |
| `/thecolouredclap-com-.../` | Centro de manicura y pedicura en el Centro Comercial Santa Mónica \| Nanci Nails | 79 |
| `/nuestras-ofertas/` | Nuestras ofertas \| Nanci Nails | 30 |
| `/galerias/` | Galería \| Nanci Nails | 21 |
| `/instagram/` | Instagram \| Nanci Nails | 23 |
| `/testimonials/` | Testimonials \| Nanci Nails | 26 |
| `/our-clients/` | Our Clients \| Nanci Nails | 25 |
| `/trabaja-con-nosotros/` | Trabaja con nosotros \| Nanci Nails | 34 |

**El fallo gordo:** las páginas que atacan "manicura en Rivas Vaciamadrid" y
"pedicura en Rivas Vaciamadrid" tienen de título "Manicura | Nanci Nails" y
"Pedicura | Nanci Nails". La URL lleva el *keyword* local, pero el título —que es
lo que Google pondera y lo que el usuario lee en los resultados— **no menciona
Rivas Vaciamadrid**. Se está desperdiciando el activo más valioso de la página.

La única que lo hace bien es `/mejor-centro-de-manicura-en-rivas-vaciamadrid/`.
Y la portada tampoco nombra la ciudad: 68 caracteres y ni una vez "Rivas".

### El resto

| Elemento | Estado |
|---|---|
| `meta description` | ❌ **Ninguna. En las 14 páginas.** |
| Open Graph (`og:*`) | ❌ Ninguno |
| Twitter Card | ❌ Ninguna |
| JSON-LD / datos estructurados | ❌ **Cero** |
| `meta robots` | Solo `max-image-preview:large` |
| `hreflang` | No aplica (monolingüe) |

Sin `meta description`, Google se inventa el fragmento del resultado tomando el
primer texto que pilla. En esta web, ese texto suele ser el menú de navegación.
Sin Open Graph, cada vez que alguien comparte el enlace por WhatsApp —que es
**el** canal de este negocio— sale una tarjeta gris sin foto ni texto.

Sin JSON-LD, Google no tiene una declaración explícita de que esto es un
`NailSalon` con dirección, teléfono y horario. Para SEO local eso es dejar de
jugar la mitad del partido.

---

## 3. Contenido y estructura

### Encabezados: rotos

- **8 de 14 páginas no tienen ningún `<h1>`.**
- Las 6 que sí lo tienen comparten **el mismo H1, y es absurdo**:

  > `<h1>Trabajamos con lociones para manos de Kinetics.</h1>`

  Ese H1 aparece idéntico en la portada, en manicura, en pedicura, en diseño de
  uñas, en ofertas y en la del centro comercial. El encabezado más importante de
  cada página está gastado en el nombre de un proveedor.

- El orden es un caos: en la portada aparecen 2 `<h2>` y varios `<h3>`/`<h4>`
  **antes** del `<h1>`.

### Contenido duplicado entre las landings locales

Comparando el texto de las páginas de aterrizaje entre sí:

| Par de páginas | Similitud |
|---|---|
| manicura ↔ pedicura | **80 %** |
| manicura ↔ diseño de uñas | **80 %** |
| pedicura ↔ diseño de uñas | **80 %** |
| portada ↔ manicura | 81 % |

Tres páginas que compiten por *keywords* distintos comparten el 80 % del texto.
Google elige una y devalúa las otras (canibalización). Aun así **posicionan**,
lo cual dice mucho de lo poco competido que está el nicho local: hay margen real
de mejora con muy poco esfuerzo.

### Imágenes: 0 de 19

En la portada hay 19 imágenes y **ninguna tiene atributo `alt` útil**. Todas
vacías.

Lo curioso es que los **nombres de archivo sí están optimizados** y alguien los
pensó:

```
manicura-y-pedicura-en-Rivas.jpg
pedicura-spa-en-Rivas-Vaciamadrid.jpg
manicura-para-hombres-en-Rivas.jpg
Nanci-Nails-Carta-de-Colores.jpg
```

Se hizo el trabajo del nombre de archivo y se olvidó el `alt`, que pesa mucho
más. Búsqueda por imágenes: perdida. Accesibilidad: perdida.

### Densidad de palabras clave (portada)

| Término | Apariciones |
|---|---|
| manicura | 44 |
| pedicura | 42 |
| uñas | 27 |
| madrid | 15 |
| rivas | 14 |
| rivas vaciamadrid | 13 |
| gel | 5 |
| santa mónica | 3 |
| esmaltado permanente | 3 |
| semipermanente | 3 |
| esculpidas | 2 |
| nail art | 1 |
| **acrílicas** | **0** |

La cobertura de "manicura/pedicura + Rivas" es sólida. Lo que falta son los
términos de servicio que hoy busca la gente: *uñas acrílicas*, *nail art*,
*semipermanente*, *esmaltado permanente*, *francesa*, *baby boomer*, *uñas
esculpidas*.

---

## 4. SEO local y NAP

Datos de contacto que expone la web actual:

| Campo | Valor en la web |
|---|---|
| Nombre | Nanci Nails |
| Dirección | `Centro Comercial Santa Mónica,, Rivas-Vaciamadrid, Madrid` |
| Teléfono fijo | 916 66 31 46 |
| Móvil / WhatsApp | 648 76 08 40 |
| Email | info@nancinails.es |
| Horario | Presente, pero solo como texto suelto |

Problemas:

1. **Sin calle ni código postal.** La consistencia NAP (Name–Address–Phone) entre
   web, Google Business Profile y directorios es uno de los factores más fuertes
   del *local pack*. Una dirección incompleta debilita esa señal.
2. **Doble coma** en la dirección (`Santa Mónica,,`) — se arrastra a cualquier
   scraper que la lea.
3. **Cero marcado `LocalBusiness`/`NailSalon`.**
4. **Sin mapa incrustado** ni enlace a la ficha de Google Maps.

### Erratas visibles en el contenido

Están en producción, las lee el cliente y las lee Google:

- `Manicura permanete` (falta la "n")
- `Pedicura Deluxe fara el` (por "para él")
- `Sabado` sin tilde
- `UñAS ESCULPIDAS`, `uÑAS PINTADAS` — mayúsculas descuadradas
- `Manicure Deluxe` — inglés mezclado con el resto en español

---

## 5. Ruido técnico

### robots.txt — roto

```
User-agent:*
Disalow:/wp-admin/
Sitemap:https://nancinails.es/sitemap.xml
Sitemap:https://nancinails.es/?sitemap.xml
```

Tres fallos en cuatro líneas:

1. **`Disalow`** — escrito mal. La directiva no existe, los buscadores la ignoran
   y `/wp-admin/` queda abierto al rastreo.
2. `User-agent:*` sin espacio tras los dos puntos. Tolerado por Google, pero no
   por todos los rastreadores.
3. La segunda línea `Sitemap` (`/?sitemap.xml`) no es una URL de sitemap válida.

### URLs basura en el sitemap

| URL | Problema |
|---|---|
| `/thecolouredclap-com-cc-comercial-santa-monica-rivas-vaciamadrid/` | **El slug lleva el dominio de otra empresa** (`thecolouredclap.com`). Importación mal hecha. Pésima señal de calidad. |
| `/our-clients/` | Slug en inglés, sobrante de la demo del tema |
| `/testimonials/` | Ídem |
| `/personalizar-cookies/` | Página de utilidad, no debería estar en el sitemap |

### Otros

- **Enlaces internos inconsistentes**: la portada enlaza a la vez a
  `/servicios` y `/servicios/`, `/centro-de-manicura-en-rivas-vaciamadrid` y
  `/centro-de-manicura-en-rivas-vaciamadrid/`. Cada par genera un salto de
  redirección extra y diluye el rastreo.
- RSS, oEmbed y `xmlrpc.php` expuestos (heredado de WordPress, sin uso aquí).

---

## 6. Qué tiene ya la web nueva

Antes de la lista de deberes, lo que **ya está resuelto** en `src/layouts/Layout.astro`:

| Elemento | Estado |
|---|---|
| `<title>` con ciudad | ✅ `Nanci Nails · Manicura y pedicura en Rivas Vaciamadrid` |
| `meta description` | ✅ 176 caracteres, con servicios y ciudad |
| Canonical absoluto | ✅ |
| Open Graph completo + imagen 1200×630 | ✅ |
| Twitter Card | ✅ |
| JSON-LD `NailSalon` | ✅ con `address`, `openingHoursSpecification`, `sameAs`, `telephone`, `email` |
| `geo.region` / `geo.placename` | ✅ |
| `noindex` en previews de Vercel | ✅ |
| Un solo `<h1>` por página | ✅ |
| Jerarquía H1 → H2 → H3 → H4 correcta | ✅ |
| Mapa de Google incrustado | ✅ |
| Imágenes responsive con `srcset` | ✅ |
| Peso de página | ✅ órdenes de magnitud por debajo del WordPress |

Partimos muy por delante. Lo que falta es lo que sigue.

---

## 7. Plan de mejora

### 5.1 · Redirecciones 301 — BLOQUEANTE

✅ **Hecho**: `vercel.json` en la raíz, con redirecciones **reales de servidor**.

Tres detalles de implementación que conviene no deshacer:

1. **Sin claves `comment` dentro de las reglas.** El esquema de Vercel solo
   admite `source`, `destination`, `permanent`, `statusCode`, `has` y `missing`.
   Una clave extra puede tumbar el despliegue, así que la documentación vive
   aquí y no en el JSON.
2. **Cada origen aparece dos veces**, con barra final y sin ella. Las URLs
   antiguas terminaban en `/`, y así la regla acierta sin depender del orden en
   que Vercel aplica `trailingSlash` y `redirects`.
3. **`trailingSlash: true`**, que es lo coherente con la salida de Astro
   (`/pagina/index.html`) y con las canónicas que emite el `Layout`.

> **Por qué no usar `redirects` de `astro.config.mjs` a secas:** en una build
> estática sin adaptador, Astro genera páginas HTML con `<meta http-equiv="refresh">`
> en lugar de un 301 de verdad. Google acaba entendiéndolo, pero transfiere peor y
> más lento. Con `vercel.json` es un 301 HTTP limpio desde el primer día.

El mapa completo (cada origen se genera también con barra final):

| URL antigua | Destino | Por qué |
|---|---|---|
| `/centro-de-manicura-en-rivas-vaciamadrid` | `/manicura-rivas-vaciamadrid/` | Página equivalente |
| `/mejor-centro-de-manicura-en-rivas-vaciamadrid` | `/manicura-rivas-vaciamadrid/` | Misma intención de búsqueda |
| `/centro-de-pedicura-en-rivas-vaciamadrid` | `/pedicura-rivas-vaciamadrid/` | Página equivalente |
| `/diseno-de-unas-de-gel-en-rivas-vaciamadrid` | `/unas-de-gel-rivas-vaciamadrid/` | Página equivalente |
| `/thecolouredclap-com-...-rivas-vaciamadrid` | `/#donde` | Su contenido era el del centro comercial |
| `/servicios`, `/nuestras-ofertas` | `/#tarifas` | Sin *keyword* local que preservar |
| `/galerias`, `/instagram` | `/#trabajos` | Ídem |
| `/contacta` | `/#donde` | Ídem |
| `/testimonials`, `/our-clients` | `/` | Slugs demo del tema Divi |
| `/trabaja-con-nosotros`, `/personalizar-cookies` | `/` | Sin equivalente |
| `/feed`, `/comments/feed`, `/wp-json/*` | `/` | Restos de WordPress |

La distinción que importa: **redirigir a un ancla transfiere autoridad a la
portada pero destruye la página como activo de *keyword***. Para `/servicios/` o
`/galerias/` da igual, no tienen *keyword* local. Para las cuatro URLs de Rivas
no da igual en absoluto, y por eso apuntan a páginas reales.

Las legales (`/aviso-legal/`, `/politica-de-privacidad/`, `/politica-de-cookies/`)
**no se redirigen: hay que recrearlas**. Son obligación legal (LSSI-CE + RGPD),
no una cuestión de SEO. Mientras no existan, caen en la 404.

---

### 5.2 · Recuperar las páginas de aterrizaje local — ✅ HECHO

Aquí está el nudo del encargo. Has pedido dos cosas que tiran en direcciones
opuestas:

- La web nueva es una **landing de una sola página**, y como pieza de diseño y de
  conversión está bien resuelta.
- Quieres **mantener o mejorar** el posicionamiento local.

En SEO local, cada intención de búsqueda quiere su propia URL. Una sola página no
puede ser simultáneamente la mejor respuesta a "centro de manicura en Rivas",
"pedicura en Rivas" y "uñas de gel en Rivas". Google necesita tres documentos.

Decisión tomada: **la portada no se toca** —es la que convierte— y se añaden
**tres páginas de servicio** que heredan el posicionamiento.

La objeción razonable era si esto degrada el resultado visual del *one-pager*.
No lo hace, y el motivo es que **son dos públicos que no se cruzan**: quien busca
"nanci nails" o llega por Instagram cae en la portada y la ve intacta; quien
busca "pedicura en Rivas Vaciamadrid" aterriza directamente en la página de
pedicura y nunca pasa por la portada. No se parte una experiencia en cuatro: se
abren tres puertas de entrada que antes no existían.

| URL | `<title>` | Palabras |
|---|---|---|
| `/manicura-rivas-vaciamadrid/` | Manicura en Rivas Vaciamadrid · Nanci Nails | ~1.070 |
| `/pedicura-rivas-vaciamadrid/` | Pedicura en Rivas Vaciamadrid · Nanci Nails | ~960 |
| `/unas-de-gel-rivas-vaciamadrid/` | Uñas de gel en Rivas Vaciamadrid · Nanci Nails | ~1.120 |

Lo que lleva cada una:

- **El *keyword* delante en el `<title>`**, no detrás. Corrige el fallo más caro
  de la web actual, donde estas páginas se titulaban "Manicura | Nanci Nails".
- **`<h1>` propio con la frase exacta**: "Manicura en Rivas Vaciamadrid". Nada
  de lociones Kinetics.
- **Texto único**. Cada página responde dudas distintas —permanente y cuidado en
  manicura, durezas y estacionalidad en pedicura, gel contra acrílico y retirada
  en gel— y no se solapan. Justo lo contrario del 80 % compartido de la web
  antigua.
- **Tarifas filtradas** del mismo `servicios.ts`, para que un precio se cambie en
  un único sitio.
- **JSON-LD `Service` + `BreadcrumbList` + `FAQPage`**, además del `NailSalon`.
- **Enlaces cruzados** entre las tres, desde la sección de tarifas y desde el pie.

#### Por qué NO cuelgan solo del pie

Es la diferencia entre una página de servicio y una *doorway page*, que Google
penaliza de forma explícita. Enlazar una página únicamente desde el pie es
declarar que existe para el buscador y no para quien navega.

Estas no lo son —tienen contenido propio, tarifas y respuestas que la portada no
da— pero el test honesto es otro: **si una página merece posicionar, merece estar
en el recorrido**. Si no es lo bastante buena para la navegación, tampoco debería
estarlo para Google.

Por eso el enlace principal vive en la **sección de tarifas**, junto a cada
grupo: quien está leyendo los precios de uñas de gel es exactamente quien quiere
saber cuánto duran, cada cuánto se rellenan y en qué se diferencian del acrílico.
El emparejamiento grupo → página lo resuelve `paginaDeGrupo()`, y una página
nunca se enlaza a sí misma.

Resultado, enlaces entrantes por página: **portada** (tarifas + pie), **las otras
dos páginas** (sección "También en el salón" + pie). Ninguna depende del pie.

Se reutilizan los componentes existentes (`Servicios`, `Galeria`, `Ubicacion`,
`BotonReserva`, `Cabecera`, `PieDePagina`) con los mismos tokens de
`global.css`, así que el sistema visual es literalmente el mismo. El único
cambio de registro es la portada de cada página: tipográfica en lugar de
fotográfica, porque el hero a pantalla completa con foto a sangre solo funciona
si es único. Repetido cuatro veces se convierte en plantilla.

**Archivos**: `src/data/paginasServicio.ts` (contenido),
`src/pages/[servicio].astro` (plantilla), `src/components/Preguntas.astro` (FAQ).

---

### 5.3 · Datos estructurados: ampliar lo que ya hay

El `NailSalon` de `Layout.astro` ya estaba bien montado. Se le han añadido los
campos que Google usa para el *local pack* y los resultados enriquecidos:

| Campo | Estado | Por qué |
|---|---|---|
| `image` | ✅ Añadido | Google la muestra en la ficha |
| `priceRange` | ✅ `"€€"` | Aparece en el *knowledge panel* |
| `hasMap` | ✅ Añadido | Vincula web ↔ ficha de Maps. Reutiliza el `enlaceMapa` de `negocio.ts` |
| `areaServed` | ✅ Rivas, Arganda, Velilla, Madrid | Amplía el radio de captación por la A-3 |
| `makesOffer` | ⏸ **Condicionado** | Se emite solo cuando `hayPreciosProvisionales` es `false`. Ahora mismo no sale |
| `geo` | ⬜ Pendiente de dato | Requiere lat/lon reales medidas sobre el mapa |
| `aggregateRating` | ⬜ Pendiente de dato | Requiere reseñas reales publicadas |

Dos campos se han dejado deliberadamente fuera, y conviene entender por qué:

> ⚠️ **Los precios provisionales no se marcan.** `servicios.ts` sigue con
> `provisional: true`. Publicar esos precios como datos estructurados es poner
> una tarifa falsa **dentro del resultado de Google**. El código lo bloquea solo:
> `makesOffer` aparece cuando se confirmen los precios, no antes.

> ⚠️ **`aggregateRating` no se inventa.** Marcar valoraciones que no existen es
> motivo de penalización manual por *spam* de datos estructurados. Solo se añade
> cuando haya reseñas reales publicadas en la propia web.

> ⚠️ **`geo` tampoco.** Unas coordenadas aproximadas mandan a la clienta a la
> puerta equivocada. Mejor sin el campo que con él mal.

**Pendiente de dato real:** `src/data/negocio.ts` documenta que la calle
`Calle Aloe, 14` y el CP `28522` vienen de la ficha del centro comercial en Maps,
y que falta confirmar el número de local. Ese dato hay que cerrarlo con la dueña
**antes** de publicar: una dirección inconsistente entre web y Google Business
Profile es de lo que más daño hace en local.

---

### 5.4 · Técnico

| Tarea | Estado | Detalle |
|---|---|---|
| **Sitemap** | ✅ Hecho | `@astrojs/sitemap` instalado y configurado en `astro.config.mjs`. En vista previa se genera vacío vía `filter`, para que una copia de pruebas no ofrezca URLs a Google. |
| **robots.txt** | ✅ Hecho | `src/pages/robots.txt.ts`, **generado en lugar de estático** para que la línea `Sitemap:` use el dominio de cada despliegue. En vista previa emite `Disallow: /`. Y esta vez `Disallow` va bien escrito. |
| **404 personalizado** | ✅ Hecho | `src/pages/404.astro`, con `noindex` y el CTA de WhatsApp: quien aterriza ahí venía a pedir cita, no a leer un error. |
| **Google Search Console** | ⬜ Pendiente | Dar de alta el dominio y enviar el sitemap. "Cambio de dirección" no aplica (mismo dominio), pero hay que vigilar el informe de cobertura las 4–6 semanas siguientes. |
| **Core Web Vitals** | ⬜ Pendiente | Medir con PageSpeed tras publicar. Partiendo de Astro estático debería salir verde de calle; el WordPress actual no lo está. |
| **Favicon / manifest** | ⬜ Pendiente | Ya hay `favicon.svg` e `.ico`. Añadir `apple-touch-icon` y un `site.webmanifest` mínimo. |

---

### 5.5 · Contenido: cubrir los huecos de palabras clave

Términos que la web actual **no cubre o cubre mal** y que sí se buscan:

| Término | Actual | Acción |
|---|---|---|
| uñas acrílicas | **0 menciones** | Añadir a servicios y a la landing de gel |
| nail art | 1 | Sección de diseño, ya tienes fotos que lo demuestran |
| esmaltado semipermanente | 3 | Es de los términos más buscados del sector |
| francesa / baby boomer | — | Los tienes en la galería (`frances-babyboomer-nude.jpg`) sin nombrar |
| uñas esculpidas | 2 | Reforzar |
| manicura para hombres | Existe (`/para ellos/`) | Mantener: nicho con poquísima competencia local |
| retirada / relleno | — | Búsquedas de intención muy alta |
| pedicura spa | Sí | Mantener |

Y un contenido que hoy no existe y rinde muy bien en local:

- **Bloque de preguntas frecuentes** con marcado `FAQPage`: cuánto dura el
  esmaltado permanente, diferencia gel vs. acrílico, cada cuánto rellenar, si hay
  que pedir cita, si hay parking en el centro comercial. Gana espacio en
  resultados y responde justo lo que la clienta duda antes de escribir.

---

### 5.6 · Fuera de la web (donde se gana el *local pack*)

El posicionamiento local no se juega solo en el HTML. Esto pesa tanto o más:

1. **Google Business Profile.** Es la palanca número uno. Verificar que la ficha
   está reclamada, con horario correcto, categoría primaria "Salón de uñas",
   fotos recientes y publicaciones periódicas. `negocio.ts` ya deja escrito que
   no está confirmado si la ficha está publicada — **hay que resolverlo**.
2. **Reseñas.** Pedirlas sistemáticamente tras cada servicio. Volumen, frescura y
   respuesta del negocio son señales directas de ranking local.
3. **NAP consistente** en Google, Facebook, Instagram, páginas amarillas, Yelp,
   Treatwell y el directorio del propio C.C. Santa Mónica. Mismo formato,
   carácter por carácter.
4. **Enlaces locales**: web del centro comercial, asociaciones de comercio de
   Rivas, prensa local (Rivas Actual, Diario de Rivas).
5. **Instagram → web.** `@nanci.nails_nn` es un activo real. Que el enlace de la
   bio apunte al dominio, no a un enlace intermedio.

---

## 8. Checklist de lanzamiento

Por orden. Nada de saltarse el bloque uno.

**Bloqueante — antes de apuntar el DNS**

- [x] `@astrojs/sitemap` instalado y configurado
- [x] `robots.txt` generado y bien escrito
- [x] `src/pages/404.astro`
- [x] JSON-LD ampliado (`image`, `priceRange`, `hasMap`, `areaServed`)
- [x] Las tres páginas de servicio local
- [x] Bloque de FAQ con `FAQPage` en cada una
- [x] `vercel.json` con las 301
- [ ] **Fotos de pedicura** — ver aviso abajo
- [ ] Repasar con la dueña la etiqueta `gel` de `galeria.ts`
- [x] Páginas legales recreadas (aviso legal, privacidad, cookies)
- [x] Dirección postal completa — el número de local salió del aviso legal antiguo
- [ ] **Revisar los textos legales con la dueña** — ver aviso abajo
- [ ] Precios reales confirmados (`servicios.ts` sigue con `provisional: true`)
- [ ] Verificar en el primer `build` que se generan `sitemap-index.xml` y `robots.txt`
- [ ] Probar las 301 en el despliegue de vista previa

**Semana 1**

- [ ] Alta en Google Search Console + envío del sitemap
- [ ] Ficha de Google Business Profile verificada y actualizada
- [ ] Comprobar en Search Console que las URLs antiguas se leen como 301, no 404
- [ ] Coordenadas reales del local → campo `geo` del JSON-LD

**Semanas 2–6**

- [ ] Campaña de reseñas en Google
- [ ] Auditoría NAP en directorios
- [ ] Enlaces locales (C.C. Santa Mónica, prensa de Rivas)

> ⚠️ **Falta material fotográfico de pedicura.** De las 19 fotos de la galería
> solo **una** es de pedicura. La página de pedicura sale hoy **sin sección de
> trabajos**, porque un mosaico con una sola foto se ve roto y transmite lo
> contrario de lo que buscamos. No se ha rellenado con fotos de manicura a
> propósito: enseñar manos bajo el titular "Pedicura en Rivas Vaciamadrid"
> engaña a quien mira y desdibuja la página ante Google.
>
> Se arregla con fotos, no con código: con 4–5 fotos de pedicura etiquetadas
> como `pies` en `galeria.ts`, la sección aparece sola.

> ⚠️ **Los textos legales están copiados literalmente de la web antigua**, tal
> como se pidió, pero describen una web que ya no existe. Declaran Google
> Analytics, DoubleClick, AdSense, un boletín de Mailchimp, formularios de
> contacto, alojamiento en IONOS y un banner de cookies. **La web nueva no tiene
> nada de eso.** En cambio SÍ instala una cookie de terceros que la política no
> menciona: la del mapa de Google incrustado.
>
> Una política de privacidad que declara tratamientos inexistentes y un
> encargado equivocado no es un problema de estilo, es una inexactitud frente al
> RGPD. Hay que revisarla con la dueña antes de publicar.

---

## 9. Cómo medir si funcionó

Antes de cambiar nada, tomar la foto del estado actual para poder comparar:

1. **Search Console** → exportar consultas y posiciones de los últimos 3 meses.
   Sin esa línea base, después no hay forma de saber si mejoró o empeoró.
2. **Posiciones a vigilar**: "manicura Rivas Vaciamadrid", "pedicura Rivas
   Vaciamadrid", "uñas de gel Rivas", "salón de uñas Rivas", "manicura Santa
   Mónica Rivas", "nanci nails".
3. **Ventana de estabilización**: 4–8 semanas. Es **normal** una caída temporal
   las 2–3 primeras semanas tras un cambio de estructura. Lo que no es normal es
   que a las 6 semanas no haya recuperado. Si eso pasa, el problema está casi
   siempre en las redirecciones.
4. **Conversión**: clics en el botón de WhatsApp. Es la métrica que de verdad
   importa; las posiciones son el medio.

---

## Resumen en cuatro líneas

La web actual posiciona **a pesar de** su SEO, no gracias a él: cero
descripciones, cero datos estructurados, cero Open Graph, H1 repetidos y
absurdos, `alt` vacíos, contenido duplicado al 80 % y un `robots.txt` con una
errata que lo invalida. Rankea porque el nicho local está poco competido y porque
las URLs llevan el *keyword*.

La web nueva nace mejor en todo lo técnico. El único punto donde podía salir
perdiendo era la arquitectura, de 18 URLs a 1, y está resuelto: 301 reales en
`vercel.json` y tres páginas de servicio local con texto propio, tarifas, FAQ y
datos estructurados.

Lo que queda no es código, son **datos que solo tiene la dueña**: los precios
reales, la dirección exacta del local, fotos de pedicura y la ficha de Google
Business Profile verificada. Con eso cerrado, esto no mantiene el
posicionamiento — lo supera con holgura.
