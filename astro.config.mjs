// @ts-check
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  // Necesario para generar URLs absolutas (canonical, Open Graph, sitemap).
  site: 'https://nancinails.es',

  image: {
    // Todas las imágenes son responsive por defecto: Astro genera el srcset y
    // el sizes. El grueso del tráfico es móvil y no queremos servir 1440px a
    // una pantalla de 390px.
    layout: 'constrained',
    responsiveStyles: true,
  },
})
