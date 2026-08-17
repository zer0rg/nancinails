import type { APIRoute } from 'astro'

/**
 * robots.txt generado, no estático.
 *
 * Se genera para que la línea `Sitemap:` use el dominio real de cada
 * despliegue en lugar de tenerlo escrito a mano. Un robots.txt estático en
 * `public/` apuntaría siempre a nancinails.es, incluso desde una vista previa.
 *
 * La web antigua tenía este archivo escrito a mano y con una errata que lo
 * invalidaba: decía `Disalow` en lugar de `Disallow`, así que la directiva se
 * ignoraba por completo. De ahí que aquí no se escriba nada a mano.
 */

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('Falta `site` en astro.config.mjs')

  const esProduccion = site.hostname === 'nancinails.es'

  // En vista previa se cierra el sitio entero: una copia de pruebas indexada
  // le hace la competencia al dominio real.
  const cuerpo = esProduccion
    ? `User-agent: *
Allow: /

Sitemap: ${new URL('sitemap-index.xml', site).href}
`
    : `User-agent: *
Disallow: /
`

  return new Response(cuerpo, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
