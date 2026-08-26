// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
/*
 * Dominio con el que se construyen las URLs absolutas (canonical, Open Graph).
 *
 * En los despliegues de vista previa se usa la URL que asigna Vercel. Si no,
 * las miniaturas al compartir el enlace apuntarían a nancinails.es/og.jpg, que
 * todavía no existe, y quien reciba el enlace vería un recuadro roto.
 *
 * SITE_URL permite forzarlo a mano desde cualquier otro alojamiento.
 */
const dominio =
  process.env.SITE_URL ||
  (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production' && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://nancinails.es')

/*
 * Los despliegues de vista previa no son el sitio real.
 *
 * Se usa en el sitemap y en robots.txt para que una copia de pruebas nunca
 * compita en Google con nancinails.es. El mismo criterio que aplica el
 * `noindex` de Layout.astro.
 */
const esProduccion = dominio === 'https://nancinails.es'
const rutasNoIndexables = new Set([
  '/aviso-legal/',
  '/politica-de-cookies/',
  '/politica-de-privacidad/',
])

export default defineConfig({
  // Necesario para generar URLs absolutas (canonical, Open Graph, sitemap).
  site: dominio,
  trailingSlash: 'always',

  integrations: [
    sitemap({
      /*
       * En vista previa el sitemap se genera vacío en lugar de omitirse: así
       * la ruta existe y no devuelve un 404 al probar el despliegue, pero no
       * le ofrece a Google ni una URL que rastrear.
       */
      filter: (page) => esProduccion && !rutasNoIndexables.has(new URL(page).pathname),
    }),
  ],

  image: {
    // Todas las imágenes son responsive por defecto: Astro genera el srcset y
    // el sizes. El grueso del tráfico es móvil y no queremos servir 1440px a
    // una pantalla de 390px.
    layout: 'constrained',
    responsiveStyles: true,
  },
})
