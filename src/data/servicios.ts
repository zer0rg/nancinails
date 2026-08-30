/**
 * Catálogo de servicios.
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
      },
      {
        nombre: 'Manicura spa',
        descripcion: 'Exfoliación, mascarilla e hidratación con productos Kinetics.',
        duracion: 60,
      },
      {
        nombre: 'Esmaltado permanente',
        descripcion: 'Color en gel que aguanta tres semanas sin saltarse ni perder brillo.',
        duracion: 45,
      },
      {
        nombre: 'Manicura spa con esmaltado permanente',
        descripcion: 'El tratamiento completo y el color, en una sola cita.',
        duracion: 60,
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
      },
      {
        nombre: 'Relleno de gel',
        descripcion: 'Mantenimiento cada tres o cuatro semanas, según crecimiento.',
        duracion: 60,
      },
      {
        nombre: 'Retirada de gel',
        descripcion: 'Retirada cuidada, sin dañar la uña natural.',
        duracion: 15,
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
      },
      {
        nombre: 'Pedicura con esmaltado permanente',
        descripcion: 'El tratamiento completo con color de larga duración.',
        duracion: 45,
      },
    ],
  },
  {
    id: 'diseno',
    titulo: 'Diseño',
    entradilla: 'Se añade a cualquier servicio. El acabado depende del detalle.',
    servicios: [
      {
        nombre: 'Francesa o babyboomer',
        descripcion: 'Clásica o degradada, a mano alzada.',
        duracion: null,
      },
      {
        nombre: 'Diseño a mano alzada',
        descripcion: 'Flores, mármol, carey o líneas, a mano alzada.',
        duracion: null,
      },
      {
        nombre: 'Diseño 3D',
        descripcion: 'Flores, mármol, carey o líneas con relieve y volumen.',
        duracion: null,
      },
      {
        nombre: 'Pedrería y aplicaciones',
        descripcion: 'Piedras, perlas o aplicaciones para completar el diseño.',
        duracion: null,
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
      },
      {
        nombre: 'Depilación de labio con hilo',
        descripcion: 'Eliminación del vello del labio superior con hilo, rápida y precisa.',
        duracion: 5,
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
      },
    ],
  },
]

/** "45 min" o "1 h 45 min". Vacío si la duración depende del diseño. */
export function formatearDuracion(servicio: Servicio): string {
  if (servicio.duracion === null) return ''
  const horas = Math.floor(servicio.duracion / 60)
  const minutos = servicio.duracion % 60
  if (!horas) return `${minutos} min`
  return minutos ? `${horas} h ${minutos} min` : `${horas} h`
}
