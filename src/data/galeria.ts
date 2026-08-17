/**
 * Galería de trabajos.
 *
 * Todas las imágenes están normalizadas a 4:5 por `scripts/procesar-fotos.mjs`.
 * Para sustituir el material por las fotos nuevas basta con reemplazar el
 * archivo en `src/assets/galeria/` conservando el nombre: el encuadre no cambia
 * y este archivo no se toca.
 *
 * El texto alternativo describe el trabajo de verdad. "Imagen de uñas" no le
 * sirve a nadie, ni a una persona ciega ni a Google.
 */
import type { ImageMetadata } from 'astro'

// El hero tiene su propio encuadre apaisado: el hueco es horizontal y una foto
// vertical recortada ahí deja solo dedos. Lo genera scripts/procesar-fotos.mjs.
import heroApaisado from '../assets/hero.jpg'
import almendraNegraCarey from '../assets/galeria/almendra-negra-carey.jpg'
import francesBabyboomer from '../assets/galeria/frances-babyboomer-nude.jpg'
import rojoRosaPintada from '../assets/galeria/rojo-rosa-pintada-a-mano.jpg'
import nudeNaturalBrillo from '../assets/galeria/nude-natural-brillo.jpg'
import degradadoLilaNegro from '../assets/galeria/degradado-lila-negro.jpg'
import pedicuraRojo from '../assets/galeria/pedicura-rojo-intenso.jpg'
import nudeCremoso from '../assets/galeria/nude-cremoso-almendra.jpg'
import turquesaMarmol from '../assets/galeria/turquesa-lineas-marmol.jpg'
import lilaPastel from '../assets/galeria/lila-pastel-purpurina.jpg'
import purpurinaCoral from '../assets/galeria/purpurina-coral-rosa.jpg'
import coralLiso from '../assets/galeria/coral-liso-almendra.jpg'
import rojoDisenoBn from '../assets/galeria/rojo-diseno-blanco-negro.jpg'
import fucsiaTornasolado from '../assets/galeria/fucsia-tornasolado.jpg'
import degradadoRosaFlores from '../assets/galeria/degradado-rosa-flores.jpg'
import degradadoNaranja from '../assets/galeria/degradado-naranja-coral.jpg'
import rosaNeonFrancesa from '../assets/galeria/rosa-neon-frances-invertida.jpg'
import rosaNeonFloral from '../assets/galeria/rosa-neon-diseno-floral.jpg'
import neonArcoiris from '../assets/galeria/neon-multicolor-arcoiris.jpg'
import francesNeonExtension from '../assets/galeria/frances-neon-extension.jpg'

/**
 * Categoría de un trabajo. Sirve para que cada página de servicio muestre solo
 * las fotos que le corresponden.
 *
 * ⚠️ PENDIENTE DE REVISIÓN CON LA DUEÑA ⚠️
 * La etiqueta `gel` está asignada por criterio visual (almendras largas y
 * extensiones evidentes), no por conocimiento de la técnica usada en cada foto.
 * Solo Nanci sabe cuáles son esculpidas y cuáles esmaltado sobre uña natural.
 * Hay que repasarlo antes de publicar: la página de gel no debería enseñar como
 * gel un trabajo que no lo es.
 */
export type CategoriaTrabajo = 'manos' | 'pies' | 'gel' | 'diseno'

export type Trabajo = {
  imagen: ImageMetadata
  alt: string
  /** Ocupa dos columnas en el mosaico. Reservado a los trabajos más rotundos. */
  destacada?: boolean
  /** Páginas de servicio en las que aparece esta foto. */
  categorias: CategoriaTrabajo[]
}

/** La imagen que abre la página: es la que fija el tono de todo lo demás. */
export const portada: Trabajo = {
  imagen: heroApaisado,
  categorias: ['manos', 'gel', 'diseno'],
  alt: 'Uñas almendradas en negro con efecto carey y una flor difuminada, sobre adelfas rosas',
}

/** Trabajos de una categoría, para las páginas de servicio. */
export function trabajosDe(categoria: CategoriaTrabajo): Trabajo[] {
  return trabajos.filter((trabajo) => trabajo.categorias.includes(categoria))
}

export const trabajos: Trabajo[] = [
  {
    // La misma manicura que abre la página, aquí con el encuadre vertical
    // completo: se ven las cinco uñas y el diseño entero.
    imagen: almendraNegraCarey,
    categorias: ['manos', 'gel', 'diseno'],
    alt: 'Uñas almendradas en negro con efecto carey y una flor difuminada, sobre adelfas rosas',
  },
  {
    imagen: francesBabyboomer,
    categorias: ['manos', 'diseno'],
    alt: 'Francesa babyboomer: degradado de nude a blanco sin línea marcada',
    destacada: true,
  },
  {
    imagen: rojoRosaPintada,
    categorias: ['manos', 'diseno'],
    alt: 'Manicura roja con una rosa y hojas pintadas a mano sobre base nude',
  },
  {
    imagen: nudeNaturalBrillo,
    categorias: ['manos'],
    alt: 'Uñas naturales cortas con acabado nude de alto brillo',
  },
  {
    imagen: degradadoLilaNegro,
    categorias: ['manos', 'gel', 'diseno'],
    alt: 'Degradado de lila a negro con pedrería plateada en el anular',
  },
  {
    imagen: pedicuraRojo,
    categorias: ['pies', 'manos'],
    alt: 'Pedicura y manicura a juego en rojo intenso',
    destacada: true,
  },
  {
    imagen: nudeCremoso,
    categorias: ['manos'],
    alt: 'Almendra corta en nude cremoso con acabado satinado',
  },
  {
    imagen: turquesaMarmol,
    categorias: ['manos', 'diseno'],
    alt: 'Degradado turquesa con vetas negras de mármol trazadas a mano',
  },
  {
    imagen: lilaPastel,
    categorias: ['manos', 'gel'],
    alt: 'Almendra larga en lila pastel con purpurina fina',
  },
  {
    imagen: rojoDisenoBn,
    categorias: ['manos', 'diseno'],
    alt: 'Uñas rojas con un diseño en blanco y negro pintado a mano',
    destacada: true,
  },
  {
    imagen: purpurinaCoral,
    categorias: ['manos', 'diseno'],
    alt: 'Combinación de purpurina coral, rosa empolvado y blanco roto en forma cuadrada',
  },
  {
    imagen: coralLiso,
    categorias: ['manos'],
    alt: 'Almendra en coral liso con brillo espejo',
  },
  {
    imagen: fucsiaTornasolado,
    categorias: ['manos'],
    alt: 'Fucsia tornasolado con reflejo violeta sobre tul blanco',
  },
  {
    imagen: degradadoRosaFlores,
    categorias: ['manos', 'diseno'],
    alt: 'Degradado de nude a rosa y rojo, fotografiado sobre flores blancas',
  },
  {
    imagen: francesNeonExtension,
    categorias: ['gel', 'diseno'],
    alt: 'Uñas de gel con extensión y francesa en neón verde, rosa, amarillo y naranja',
    destacada: true,
  },
  {
    imagen: degradadoNaranja,
    categorias: ['manos'],
    alt: 'Degradado de naranja a coral en forma almendra',
  },
  {
    imagen: rosaNeonFrancesa,
    categorias: ['manos', 'diseno'],
    alt: 'Rosa neón con francesa invertida en blanco',
  },
  {
    imagen: rosaNeonFloral,
    categorias: ['manos', 'diseno'],
    alt: 'Rosa neón combinado con un diseño floral multicolor sobre base blanca',
  },
  {
    imagen: neonArcoiris,
    categorias: ['manos', 'diseno'],
    alt: 'Neones lisos combinados con un degradado arcoíris pintado a mano alzada',
  },
]
