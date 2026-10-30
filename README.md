# Nanci Nails

Landing de una sola página para Nanci Nails, centro de manicura y pedicura en el
Centro Comercial Santa Mónica de Rivas Vaciamadrid.

Objetivo único: que una visita desde el móvil acabe en una cita por WhatsApp.

- Contexto estratégico: [PRODUCT.md](PRODUCT.md)
- Sistema visual: [DESIGN.md](DESIGN.md)

## Campañas de temporada

Halloween está activo por defecto. Para recuperar el diseño habitual, añade
`SITE_THEME=default` a `.env` o a las variables de entorno del alojamiento.
Usa `SITE_THEME=halloween` para volver a activarlo; `.env.example` contiene el ejemplo.
En local reinicia Astro y, en producción, recompila y despliega: la web es estática.

El interruptor cambia la paleta, el mensaje y la imagen de campaña. Halloween
utiliza `src/assets/hero-halloween.png`; `default` conserva la fotografía real
`src/assets/hero.jpg`. Ambos mantienen el titular de manicura y pedicura en Rivas
y la acción «Reservar por WhatsApp».

Halloween recupera los murciélagos en vuelo y la araña sobre el botón de reserva,
sin calabaza. La decoración no intercepta clics y queda por debajo de los
controles de cookies; los murciélagos desaparecen con movimiento reducido.
El mensaje de campaña permanece dentro de la foto. `default` elimina la decoración.

Para preparar Navidad, San Valentín u otra campaña:

1. Añade una entrada a `src/data/temporadas.ts` con el mensaje y el contexto de
   reserva y, opcionalmente, `portada.imagen`. El titular permanece estable en
   `Hero.astro`; sin imagen de campaña se usa la fotografía habitual.
2. Define sus tokens bajo `html[data-tema='nombre']` en `src/styles/temporadas.css`.
   Usa `--reserva-fondo`, `--reserva-texto` y `--reserva-hover` para los botones;
   conserva la relación de colores de `[data-invertido]` en la galería y el visor.
3. Actívala con `SITE_THEME=nombre`. Monta la decoración condicionalmente y
   comprueba reserva, cookies y movimiento reducido. La bandada de Halloween
   vive en el Layout; el marco de la fotografía permanece en `Hero.astro`.

`temaPorDefecto` en `src/data/temporadas.ts` permite cambiar el valor sin usar
variables de entorno. Un nombre desconocido detiene la compilación con un error
que enumera los temas disponibles.

## Verificaciones de la dueña

1. **Precios reales.** El catálogo publica servicios y duraciones, no precios.
   Por eso la navegación dice «Servicios», no «Tarifas». Antes de añadir precios,
   confirmarlos con Nanci; no hay tarifas de ejemplo ni campos `provisional`.

2. **Duraciones.** Hay contradicciones entre la tabla y los textos de servicio.
   Están inventariadas como `OWNER_VERIFICATION_REQUIRED` en `SEO_AUDIT.md`.

3. **Textos legales.** Existen, pero la política de privacidad heredada declara
   proveedores que la web actual no usa. Debe revisarla una persona responsable
   del negocio con asesoramiento adecuado. El mapa de Google se mantiene sin
   `src` hasta que el visitante acepta expresamente.

4. **Texto de "El salón".** Está escrito solo con datos comprobables: servicios,
   marca de producto y ubicación. No hay biografía ni años de experiencia porque
   nadie los ha facilitado. Media hora de conversación con Nanci mejora esa
   sección más que cualquier reescritura.

## Fotografía

La galería contiene 30 trabajos reales, además de las ocho fotos del estudio.
Se conservan las marcas de agua. La portada presenta ocho trabajos inicialmente;
«Ver más trabajos» descubre el resto de la categoría elegida. Sin JavaScript se
muestran las 30 fotos. Las galerías de las páginas de servicio no se recortan.

El visor recorre todos los trabajos de la categoría, aunque no estuvieran aún
visibles en el mosaico. «Consultar este diseño» prepara un mensaje de WhatsApp
con el nombre del trabajo seleccionado; no adjunta una fotografía automáticamente.

### Fotografías del estudio

La web incorpora ocho fotos de la sesión del local, separadas de los trabajos
terminados. Se guardan en `src/assets/studio/` como WebP, con un ancho máximo de
1920 px, orientación corregida y sin metadatos EXIF. Los originales no se modifican.
Astro genera versiones más pequeñas con `srcset` y carga diferida.

| Archivo | Ubicación | Original de la sesión |
| --- | --- | --- |
| `salon-interior.webp` | El salón | DSC_1260 copia copia.jpg |
| `salon-team.webp` | El equipo | DSC_1353 copia.jpg |
| `manicure-appointment.webp` | Así trabajamos | DSC_1479 copia.jpg |
| `kinetics-products.webp` | Detalles del salón | DSC_1300 copia.jpg |
| `nail-colour-swatches.webp` | Detalles del salón | DSC_1330 copia.jpg |
| `eyebrow-threading.webp` | Detalles del salón | DSC_1402 copia.jpg |
| `polish-removal.webp` | Página de manicura | DSC_1386 copia.jpg |
| `pedicure-massage.webp` | Página de pedicura | DSC_1459 copia.jpg |

`src/components/VidaEnSalon.astro` presenta el equipo, la atención y los detalles.
El salón conserva su composición dividida. Equipo y atención comparten una fila
con fotografías de igual tamaño y proporción 3:2; ninguna ocupa por sí sola todo
el ancho de escritorio. En móvil se apilan sin bordes añadidos. Las tres
fotos de detalle comparten un encuadre 3:2 para alinear sus alturas y sus textos;
no se mezclan con la galería vertical de trabajos. Las imágenes no acreditan por
sí solas protocolos de esterilización. Antes de incorporar otras
personas reconocibles, confirmar los permisos de publicación correspondientes.

### Sustituir las fotos de trabajos

Las imágenes de la galería de trabajos están normalizadas a 4:5. Para cambiar una, basta con
reemplazar el archivo en `src/assets/galeria/` conservando el nombre: el
encuadre no cambia y no hay que tocar `src/data/galeria.ts`.

Para procesar un lote nuevo:

```sh
node scripts/procesar-fotos.mjs
```

El script recorta las bandas lisas que Instagram añade al cuadrar fotos
apaisadas, normaliza a 4:5, renombra a nombres semánticos y genera `public/og.jpg`
(la vista previa que aparece al compartir el enlace por WhatsApp).

Para apuntar a otra carpeta de origen, ajustar `ORIGEN` y la lista `PIEZAS` en
la cabecera del script.

Ojo: `assets-source/` está en `.gitignore`, así que el material original no viaja
con el repositorio. Las imágenes ya procesadas de `src/assets/galeria/` sí. Quien
clone el proyecto puede compilarlo, pero no reejecutar el script sin pedir antes
las fotos originales.

### Logo

`src/components/Logo.astro` contiene la firma tipográfica usada en cabecera y
pie: nombre en Bodoni y descriptor en Jost. El texto sigue siendo HTML para
conservar accesibilidad y nitidez. La marca rosa anterior queda archivada en
`assets-source/marca/` como referencia.

## Decisiones que conviene no deshacer

- **Fuentes autoalojadas**, no Google Fonts por CDN. Cargarlas desde Google envía
  la IP de cada visitante a un tercero sin consentimiento, y en España eso tiene
  consecuencias legales.
- **Mapa bajo consentimiento.** El iframe de Google Maps no recibe `src` hasta
  que el visitante acepta. Siempre queda disponible un enlace HTML normal.
- **Las fotos no se desaturan.** La página es blanca y negra; las fotos, no. El
  color de la uña es el producto.
- **El revelado al hacer scroll solo mueve, nunca oculta.** Si la animación no
  progresa por lo que sea, el peor caso es un bloque desplazado, no un texto
  invisible.

## Recorrido de la portada

La portada ordena trabajos destacados, servicios, salón/equipo y ubicación.
`ResumenServicios.astro` reutiliza el catálogo y presenta las seis categorías
como desplegables HTML nativos: se pueden abrir sin JavaScript y contienen los
17 servicios con sus descripciones y duraciones. La apertura tiene una entrada
suave de 240 ms y el indicador pasa de «+» a «−»; con movimiento reducido se
muestra directamente, sin animación. Las páginas de servicio siguen
usando la carta completa de `Servicios.astro`.

Se conserva `#tarifas` para no romper enlaces antiguos; sus etiquetas visibles
dicen «Servicios». La consulta de un diseño es una acción contextual distinta
de la reserva general.

## QA de la landing

Las pruebas comprueban la web compilada en Chromium, no archivos de código.
Playwright se instala de forma aislada y no es una dependencia de producción:

```sh
QA_DIR="$PWD/node_modules/.studio-qa"
npm install --prefix "$QA_DIR" --cache "$QA_DIR/npm-cache" --package-lock=false --no-audit --no-fund playwright
export PLAYWRIGHT_MODULE="$QA_DIR/node_modules/playwright/index.mjs"
export PLAYWRIGHT_BROWSERS_PATH="$QA_DIR/browsers"
node "$QA_DIR/node_modules/playwright/cli.js" install chromium --only-shell
npm run build
node --test scripts/test-landing-*.mjs
```

Para verificar también el tema habitual sin sustituir la compilación principal:

```sh
SITE_THEME=default npm run build -- --outDir node_modules/.studio-qa/default-dist
SITE_DIR=node_modules/.studio-qa/default-dist node --test scripts/test-landing-*.mjs
```

El servidor de pruebas es local y efímero. Las pruebas cubren portada, primera
visita con cookies, fotografía por tema, murciélagos y movimiento reducido,
araña y ausencia de calabaza, equipo compacto, revelado/filtros/visor, consulta del diseño,
servicios sin JavaScript y preservación de las rutas de manicura, pedicura, gel
y depilación con hilo.
La revisión visual de capturas en móvil, tableta y escritorio sigue siendo necesaria.

## Comandos

| Comando                        | Acción                                       |
| :----------------------------- | :------------------------------------------- |
| `npm run dev`                  | Servidor local en `localhost:4321`           |
| `npm run build`                | Compila a `./dist/`                          |
| `npm run preview`              | Previsualiza la compilación                  |
| `npx astro check`              | Comprueba tipos                              |
| `node scripts/procesar-fotos.mjs` | Procesa el material fotográfico de origen |
