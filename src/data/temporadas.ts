import type { ImageMetadata } from 'astro'
import heroHalloween from '../assets/hero-halloween.png'

type Campana = {
  portada: {
    imagen?: { src: ImageMetadata; alt: string }
    lineas: [string, string, string]
    descripcion: string
    reserva: string
    servicio: string
    pie: string
  }
}

/** Cada campaña reúne su contenido aquí y su paleta en styles/temporadas.css. */
export const temporadas = {
  halloween: {
    portada: {
      imagen: {
        src: heroHalloween,
        alt: 'Manicura de inspiración Halloween en negro y naranja, con un murciélago y una telaraña fina sobre fondo otoñal',
      },
      lineas: ['Tu lado', 'más', 'hechizante.'],
      descripcion:
        'Halloween: tonos de otoño y diseño a mano alzada.',
      reserva: 'Reservar por WhatsApp',
      servicio: 'una manicura para Halloween',
      pie: 'Manicura y pedicura en Rivas Vaciamadrid',
    },
  },
} satisfies Record<string, Campana>

export type Tema = 'default' | keyof typeof temporadas

// Interruptor único. SITE_THEME tiene prioridad, también en el despliegue.
const temaPorDefecto: Tema = 'halloween'
const configurado: string = import.meta.env.SITE_THEME ?? temaPorDefecto

if (configurado !== 'default' && !Object.hasOwn(temporadas, configurado)) {
  throw new Error(
    `SITE_THEME="${configurado}" no existe. Usa default o ${Object.keys(temporadas).join(', ')}.`,
  )
}

export const tema = configurado as Tema
export const campana: Campana | undefined = tema === 'default' ? undefined : temporadas[tema]
