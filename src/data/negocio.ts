/**
 * Datos del negocio. Fuente única de verdad para contacto, horarios y SEO local.
 *
 * Si cambia un teléfono, un horario o la dirección, se cambia AQUÍ y solo aquí.
 */

export const negocio = {
  nombre: 'Nanci Nails',
  descripcion: 'Centro de manicura y pedicura en Rivas Vaciamadrid',
  web: 'https://nancinails.es/',

  contacto: {
    /** Móvil del salón. Es el mismo número de WhatsApp. */
    movil: '648 76 08 40',
    movilE164: '+34648760840',
    /** Fijo del centro comercial. */
    fijo: '916 66 31 46',
    fijoE164: '+34916663146',
    email: 'info@nancinails.es',
  },

  direccion: {
    local: 'Centro Comercial Santa Mónica',
    /*
     * Número de local dentro del centro comercial.
     *
     * Sale del aviso legal que la propia dueña tenía publicado en la web
     * antigua ("LOCAL 52BIS CENTRO COMERCIAL SANTA MÓNICA"), así que es un dato
     * suyo y no una suposición. Importa más de lo que parece: sin él, una
     * clienta que no conozca el centro llega al edificio y tiene que buscar el
     * salón dentro.
     */
    numeroLocal: 'local 52 bis',
    // Dirección postal del centro comercial, según su ficha en Google Maps.
    calle: 'Calle Aloe, 14',
    codigoPostal: '28522',
    ciudad: 'Rivas-Vaciamadrid',
    provincia: 'Madrid',
    pais: 'ES',
  },

  /** Horario de apertura. `null` significa cerrado ese día. */
  horario: [
    { dia: 'Lunes', schema: 'Monday', abre: '10:00', cierra: '20:00' },
    { dia: 'Martes', schema: 'Tuesday', abre: '10:00', cierra: '20:00' },
    { dia: 'Miércoles', schema: 'Wednesday', abre: '10:00', cierra: '20:00' },
    { dia: 'Jueves', schema: 'Thursday', abre: '10:00', cierra: '20:00' },
    { dia: 'Viernes', schema: 'Friday', abre: '10:00', cierra: '20:00' },
    { dia: 'Sábado', schema: 'Saturday', abre: '10:00', cierra: '14:00' },
    { dia: 'Domingo', schema: 'Sunday', abre: null, cierra: null },
  ],

  redes: {
    instagram: 'https://www.instagram.com/nanci.nails_nn/',
    instagramUsuario: '@nanci.nails_nn',
    facebook: 'https://www.facebook.com/Nanci.Nails.NN',
  },

  /** Marcas con las que trabaja el salón. Aparece en la sección de método. */
  productos: ['Kinetics'],
} as const

/** Resumen visible derivado del horario estructurado, sin duplicar horas. */
export const horarioResumen = `De lunes a viernes de ${negocio.horario[0].abre} a ${negocio.horario[0].cierra} y los sábados de ${negocio.horario[5].abre} a ${negocio.horario[5].cierra}`

/**
 * Enlace de WhatsApp con el mensaje ya escrito.
 *
 * Que la clienta no tenga que redactar nada es la diferencia entre una cita
 * y una pestaña cerrada.
 */
export function enlaceWhatsapp(servicio?: string): string {
  const numero = negocio.contacto.movilE164.replace('+', '')
  const mensaje = servicio
    ? `Hola Nanci, me gustaría pedir cita para ${servicio}.`
    : 'Hola Nanci, me gustaría pedir cita.'
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
}

/**
 * Consulta para los mapas.
 *
 * Deliberadamente SIN la calle y el código postal, aunque los tengamos.
 *
 * Con el nombre del sitio a secas, Google lo reconoce como lugar y pinta el
 * marcador con su ficha: nombre, dirección y valoración. Al añadirle la calle,
 * lo interpreta como una dirección cualquiera, quita el marcador y deja un
 * plano mudo en el que no se distingue dónde es.
 *
 * Se busca el centro comercial y no "Nanci Nails" porque, si la ficha del
 * salón no estuviera dada de alta, el mapa saldría vacío. El centro siempre
 * existe. Cuando la dueña confirme que su ficha está publicada, se puede
 * cambiar por el nombre del salón y el marcador caerá justo en su puerta.
 */
const consultaMapa = [negocio.direccion.local, negocio.direccion.ciudad].join(', ')

/** Búsqueda en Google Maps. Funciona sin coordenadas exactas. */
export const enlaceMapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  consultaMapa,
)}`

/** Mapa incrustado. No necesita clave de API. */
export const mapaIncrustado = `https://www.google.com/maps?q=${encodeURIComponent(
  consultaMapa,
)}&hl=es&z=16&output=embed`

/** Las tres líneas NAP, compartidas por ubicación, pie y páginas legales. */
export const lineasDireccion = [
  `${negocio.direccion.local}, ${negocio.direccion.numeroLocal}`,
  negocio.direccion.calle,
  `${negocio.direccion.codigoPostal} ${negocio.direccion.ciudad}, ${negocio.direccion.provincia}`,
] as const

/** La misma dirección en una línea para `address`, `aria` y metadatos. */
export const direccionLegible = lineasDireccion.join(', ')

/**
 * Dirección de calle para el marcado `PostalAddress`.
 *
 * Incluye el número de local: la consistencia carácter a carácter entre la web,
 * la ficha de Google y los directorios es de los factores que más pesan en el
 * posicionamiento local.
 */
export const direccionPostal = `${negocio.direccion.local}, ${negocio.direccion.numeroLocal}, ${negocio.direccion.calle}`
