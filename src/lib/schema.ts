import { negocio, direccionPostal } from '../data/negocio'
import type { PaginaServicio } from '../data/paginasServicio'

export const ID_NEGOCIO = `${negocio.web}#nanci-nails`

/** Entidad local única, reutilizada desde todas las páginas indexables. */
export function esquemaNegocio(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'NailSalon',
    '@id': ID_NEGOCIO,
    name: negocio.nombre,
    description: negocio.descripcion,
    url: negocio.web,
    image: new URL('og.jpg', negocio.web).href,
    telephone: negocio.contacto.movilE164,
    email: negocio.contacto.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: direccionPostal,
      postalCode: negocio.direccion.codigoPostal,
      addressLocality: negocio.direccion.ciudad,
      addressRegion: negocio.direccion.provincia,
      addressCountry: negocio.direccion.pais,
    },
    openingHoursSpecification: negocio.horario
      .filter((dia) => dia.abre !== null)
      .map((dia) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${dia.schema}`,
        opens: dia.abre,
        closes: dia.cierra,
      })),
    sameAs: [negocio.redes.instagram, negocio.redes.facebook],
    areaServed: {
      '@type': 'City',
      name: negocio.direccion.ciudad,
    },
  }
}

export function esquemaMigas(pagina: PaginaServicio): Record<string, unknown> {
  const url = new URL(`${pagina.slug}/`, negocio.web).href

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: negocio.web },
      { '@type': 'ListItem', position: 2, name: pagina.etiqueta, item: url },
    ],
  }
}

export function esquemaServicio(pagina: PaginaServicio): Record<string, unknown> {
  const url = new URL(`${pagina.slug}/`, negocio.web).href

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#servicio`,
    name: pagina.servicio.nombre,
    description: pagina.servicio.descripcion,
    serviceType: pagina.servicio.nombre,
    url,
    provider: { '@id': ID_NEGOCIO },
    areaServed: {
      '@type': 'City',
      name: negocio.direccion.ciudad,
    },
  }
}
