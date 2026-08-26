# Nanci Nails

Landing de una sola página para Nanci Nails, centro de manicura y pedicura en el
Centro Comercial Santa Mónica de Rivas Vaciamadrid.

Objetivo único: que una visita desde el móvil acabe en una cita por WhatsApp.

- Contexto estratégico: [PRODUCT.md](PRODUCT.md)
- Sistema visual: [DESIGN.md](DESIGN.md)

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

### Sustituir las fotos

Todas las imágenes están normalizadas a 4:5. Para cambiar una, basta con
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

`src/components/Logo.astro` contiene la firma vectorial y tipográfica usada en
cabecera y pie: monograma compartido con el favicon, nombre en Bodoni y descriptor
en Jost. El texto sigue siendo HTML para conservar accesibilidad y nitidez. La
marca rosa anterior queda archivada en `assets-source/marca/` como referencia.

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
