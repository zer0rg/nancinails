// @ts-check
import { defineConfig } from 'astro/config'

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

export default defineConfig({
  // Necesario para generar URLs absolutas (canonical, Open Graph, sitemap).
  site: dominio,

  image: {
    // Todas las imágenes son responsive por defecto: Astro genera el srcset y
    // el sizes. El grueso del tráfico es móvil y no queremos servir 1440px a
    // una pantalla de 390px.
    layout: 'constrained',
    responsiveStyles: true,
  },
})
