/**
 * Catálogo de servicios.
 *
 * ⚠️ PRECIOS PROVISIONALES ⚠️
 * Todos los servicios con `provisional: true` llevan precios de referencia del
 * mercado de Rivas Vaciamadrid, NO los precios reales de Nanci Nails.
 *
 * Antes de publicar la web:
 *   1. Confirmar cada precio y duración con la dueña.
 *   2. Poner `provisional: false` en cada servicio confirmado.
 *   3. Comprobar que `hayPreciosProvisionales` es `false`.
 *
 * Mientras alguno siga en `true`, la web muestra un aviso visible en la sección
 * de tarifas. Ese aviso desaparece solo cuando no queda ninguno.
 *
 * El catálogo antiguo mezclaba nombres sin criterio ("Manicura Nanci Nails (15
 * minutos)" junto a "Manicura Permanente SPA"). Aquí se reagrupa por lo que la
 * clienta busca de verdad: manos, gel, pies y diseño.
 */

export type Servicio = {
  nombre: string
  descripcion: string
  /** Duración en minutos. `null` si depende del diseño. */
  duracion: number | null
  /** Precio en euros. `null` si es a consultar. */
  precio: number | null
  /** Se muestra como "desde 3 €". */
  desde?: boolean
  /** Se muestra como "+6 €": se suma a otro servicio. */
  suplemento?: boolean
  /** Precio pendiente de confirmar con la dueña. */
  provisional: boolean
}

export type GrupoServicios = {
  id: string
  titulo: string
  entradilla: string
  servicios: Servicio[]
}

export const grupos: GrupoServicios[] = [
  {
    id: 'manos',
    titulo: 'Manos',
    entradilla: 'Cutícula, forma y acabado. La base de todo lo demás.',
    servicios: [
      {
        nombre: 'Manicura express',
        descripcion: 'Limado, forma y cutícula. Para mantener entre citas.',
        duracion: 30,
        precio: 14,
        provisional: true,
      },
      {
        nombre: 'Manicura spa',
        descripcion: 'Exfoliación, mascarilla e hidratación con productos Kinetics.',
        duracion: 60,
        precio: 22,
        provisional: true,
      },
      {
        nombre: 'Esmaltado permanente',
        descripcion: 'Color en gel que aguanta tres semanas sin saltarse ni perder brillo.',
        duracion: 45,
        precio: 25,
        provisional: true,
      },
      {
        nombre: 'Manicura spa con esmaltado permanente',
        descripcion: 'El tratamiento completo y el color, en una sola cita.',
        duracion: 60,
        precio: 32,
        provisional: true,
      },
    ],
  },
  {
    id: 'gel',
    titulo: 'Uñas de gel',
    entradilla: 'Extensión y estructura para quien quiere más longitud o más resistencia.',
    servicios: [
      {
        nombre: 'Uñas esculpidas en gel',
        descripcion: 'Extensión construida a medida. Se elige forma y longitud.',
        duracion: 90,
        precio: 48,
        provisional: true,
      },
      {
        nombre: 'Relleno de gel',
        descripcion: 'Mantenimiento cada tres o cuatro semanas, según crecimiento.',
        duracion: 60,
        precio: 38,
        provisional: true,
      },
      {
        nombre: 'Retirada de gel',
        descripcion: 'Retirada cuidada, sin dañar la uña natural.',
        duracion: 15,
        precio: 12,
        provisional: true,
      },
    ],
  },
  {
    id: 'pies',
    titulo: 'Pies',
    entradilla: 'Tratamiento completo, no solo color.',
    servicios: [
      {
        nombre: 'Pedicura spa',
        descripcion: 'Baño, exfoliación, trabajo de durezas y masaje.',
        duracion: 60,
        precio: 28,
        provisional: true,
      },
      {
        nombre: 'Pedicura con esmaltado permanente',
        descripcion: 'El tratamiento completo con color de larga duración.',
        duracion: 45,
        precio: 35,
        provisional: true,
      },
    ],
  },
  {
    id: 'diseno',
    titulo: 'Diseño',
    entradilla: 'Se añade a cualquier servicio. El precio depende del detalle.',
    servicios: [
      {
        nombre: 'Francesa o babyboomer',
        descripcion: 'Clásica o degradada, a mano alzada.',
        duracion: null,
        precio: 6,
        suplemento: true,
        provisional: true,
      },
      {
        nombre: 'Diseño a mano alzada',
        descripcion: 'Flores, mármol, carey, líneas. Precio por uña decorada.',
        duracion: null,
        precio: 3,
        desde: true,
        provisional: true,
      },
      {
        nombre: 'Diseño 3D',
        descripcion: 'Flores, mármol, carey, líneas. Precio por uña decorada.',
        duracion: null,
        precio: 5,
        desde: true,
        provisional: true,
      },
      {
        nombre: 'Pedrería y aplicaciones',
        descripcion: 'Piedras, perlas o relieve en 3D. Precio por uña.',
        duracion: null,
        precio: 2,
        desde: true,
        provisional: true,
      },
    ],
  },
  {
    id: 'depilacion',
    titulo: 'Depilación',
    entradilla: 'Definición precisa y un acabado limpio, con la técnica del hilo.',
    servicios: [
      {
        nombre: 'Depilación de cejas con hilo',
        descripcion: 'Diseño y limpieza de cejas con hilo, respetando su forma natural.',
        duracion: 15,
        precio: 6,
        suplemento: true,
        provisional: true,
      },
      {
        nombre: 'Depilación de labio con hilo',
        descripcion: 'Eliminación del vello del labio superior con hilo, rápida y precisa.',
        duracion: 5,
        precio: 3,
        desde: true,
        provisional: true,
      },
    ],
  },
  {
    id: 'parafina',
    titulo: 'Parafina',
    entradilla: 'Calor e hidratación profunda para devolver suavidad a las manos.',
    servicios: [
      {
        nombre: 'Parafina para manos',
        descripcion: 'Baño de parafina caliente para hidratar, suavizar y reconfortar la piel.',
        duracion: 10,
        precio: 6,
        suplemento: true,
        provisional: true,
      },
    ],
  },
]

/** Mientras sea `true`, la web avisa de que las tarifas están sin confirmar. */
export const hayPreciosProvisionales = grupos.some((grupo) =>
  grupo.servicios.some((servicio) => servicio.provisional),
)

/** Formatea el precio tal y como debe leerse: "25 €", "desde 3 €", "+6 €". */
export function formatearPrecio(servicio: Servicio): string {
  if (servicio.precio === null) return 'A consultar'
  const cantidad = `${servicio.precio} €`
  if (servicio.suplemento) return `+${cantidad}`
  if (servicio.desde) return `desde ${cantidad}`
  return cantidad
}

/** "45 min" o "1 h 45 min". Vacío si la duración depende del diseño. */
export function formatearDuracion(servicio: Servicio): string {
  if (servicio.duracion === null) return ''
  const horas = Math.floor(servicio.duracion / 60)
  const minutos = servicio.duracion % 60
  if (!horas) return `${minutos} min`
  return minutos ? `${horas} h ${minutos} min` : `${horas} h`
}
