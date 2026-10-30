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

El interruptor cambia la paleta de todas las páginas, el texto de la portada
y la decoración. Halloween incluye murciélagos con vuelo y
aleteo y respeto a `prefers-reduced-motion`. En móvil vuelan dos, con tamaño y
contraste ajustados a pantallas pequeñas.
Una calabaza inclinada asoma por la esquina superior derecha de la barra de reserva
en móvil y por la esquina inferior derecha de la pantalla en escritorio, con luz
interior animada en CSS.
Toda la decoración desaparece con `default`.

La portada de Halloween usa `src/assets/hero-halloween.png`, una imagen de campaña
generada con IA a partir de la mano de la foto original. Se reserva para la portada;
la galería conserva los trabajos reales. El prompt está en
`output/imagegen/hero-halloween-prompt.txt`. Con `default` vuelve la foto original.

Para preparar Navidad, San Valentín u otra campaña:

1. Añade una entrada a `src/data/temporadas.ts` con los textos, la reserva y,
   opcionalmente, una imagen de portada con su texto alternativo.
2. Define sus tokens bajo `html[data-tema='nombre']` en `src/styles/temporadas.css`.
   Usa `--reserva-fondo`, `--reserva-texto` y `--reserva-hover` para los botones;
   conserva la relación de colores de `[data-invertido]` en la galería y el visor.
3. Actívala con `SITE_THEME=nombre`. Si lleva decoración propia, móntala
   condicionalmente como la de Halloween en `Layout.astro` y `Hero.astro`.

`temaPorDefecto` en `src/data/temporadas.ts` permite cambiar el valor sin usar
variables de entorno. Un nombre desconocido detiene la compilación con un error
que enumera los temas disponibles.

## Verificaciones de la dueña

1. **Precios reales.** Los de `src/data/servicios.ts` son de referencia del
   mercado, no los de Nanci. Cada servicio lleva un `provisional: true` mientras
   no esté confirmado.

   ⚠️ Nada indica a simple vista que estos precios son provisionales. Hay que
   confirmarlos uno a uno. Para
   comprobar si queda alguno sin revisar:

   ```sh
   grep -c "provisional: true" src/data/servicios.ts
   ```

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

El material actual son 19 fotos de su Instagram, tratadas como provisionales
hasta que lleguen las definitivas.

De los 27 archivos originales se descartaron 7: pegatinas de Stories encima de
las uñas, la barra de interfaz de Instagram, un fondo desordenado y dos fotos
apaisadas a las que el encuadre 4:5 les partía la marca de agua.

Solo hay **una foto de pedicura**, que es medio negocio. Es el primer hueco a
cubrir con el material nuevo.

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
Las fotos grandes del equipo y de la atención llegan al borde exterior de la
pantalla, alternando imagen y texto desde «El salón» sobre el mismo eje central
en escritorio y apilándose en móvil. Las tres
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

## Comandos

| Comando                        | Acción                                       |
| :----------------------------- | :------------------------------------------- |
| `npm run dev`                  | Servidor local en `localhost:4321`           |
| `npm run build`                | Compila a `./dist/`                          |
| `npm run preview`              | Previsualiza la compilación                  |
| `npx astro check`              | Comprueba tipos                              |
| `node scripts/procesar-fotos.mjs` | Procesa el material fotográfico de origen |
