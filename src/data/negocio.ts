/**
 * Datos del negocio. Fuente única de verdad para contacto, horarios y SEO local.
 *
 * Si cambia un teléfono, un horario o la dirección, se cambia AQUÍ y solo aquí.
 */

export const negocio = {
  nombre: 'Nanci Nails',
  descripcion: 'Centro de manicura y pedicura en Rivas Vaciamadrid',
  web: 'https://nancinails.es',

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
    // Dirección postal del centro comercial, según su ficha en Google Maps.
    // PENDIENTE: confirmar con la dueña el número de local o planta dentro del
    // centro. Sin ese dato, una clienta que no lo conozca llega al edificio
    // pero tiene que buscar el salón dentro.
    calle: 'Calle Aloe, 14',
    codigoPostal: '28522',
    ciudad: 'Rivas Vaciamadrid',
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

/** Texto de dirección en una línea, saltando los campos aún sin confirmar. */
export const direccionLegible = [
  negocio.direccion.local,
  negocio.direccion.calle,
  [negocio.direccion.codigoPostal, negocio.direccion.ciudad].filter(Boolean).join(' '),
]
  .filter(Boolean)
  .join(', ')
