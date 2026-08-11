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

export type Trabajo = {
  imagen: ImageMetadata
  alt: string
  /** Ocupa dos columnas en el mosaico. Reservado a los trabajos más rotundos. */
  destacada?: boolean
}

/** La imagen que abre la página: es la que fija el tono de todo lo demás. */
export const portada: Trabajo = {
  imagen: heroApaisado,
  alt: 'Uñas almendradas en negro con efecto carey y una flor difuminada, sobre adelfas rosas',
}

export const trabajos: Trabajo[] = [
  {
    // La misma manicura que abre la página, aquí con el encuadre vertical
    // completo: se ven las cinco uñas y el diseño entero.
    imagen: almendraNegraCarey,
    alt: 'Uñas almendradas en negro con efecto carey y una flor difuminada, sobre adelfas rosas',
  },
  {
    imagen: francesBabyboomer,
    alt: 'Francesa babyboomer: degradado de nude a blanco sin línea marcada',
    destacada: true,
  },
  {
    imagen: rojoRosaPintada,
    alt: 'Manicura roja con una rosa y hojas pintadas a mano sobre base nude',
  },
  {
    imagen: nudeNaturalBrillo,
    alt: 'Uñas naturales cortas con acabado nude de alto brillo',
  },
  {
    imagen: degradadoLilaNegro,
    alt: 'Degradado de lila a negro con pedrería plateada en el anular',
  },
  {
    imagen: pedicuraRojo,
    alt: 'Pedicura y manicura a juego en rojo intenso',
    destacada: true,
  },
  {
    imagen: nudeCremoso,
    alt: 'Almendra corta en nude cremoso con acabado satinado',
  },
  {
    imagen: turquesaMarmol,
    alt: 'Degradado turquesa con vetas negras de mármol trazadas a mano',
  },
  {
    imagen: lilaPastel,
    alt: 'Almendra larga en lila pastel con purpurina fina',
  },
  {
    imagen: rojoDisenoBn,
    alt: 'Uñas rojas con un diseño en blanco y negro pintado a mano',
    destacada: true,
  },
  {
    imagen: purpurinaCoral,
    alt: 'Combinación de purpurina coral, rosa empolvado y blanco roto en forma cuadrada',
  },
  {
    imagen: coralLiso,
    alt: 'Almendra en coral liso con brillo espejo',
  },
  {
    imagen: fucsiaTornasolado,
    alt: 'Fucsia tornasolado con reflejo violeta sobre tul blanco',
  },
  {
    imagen: degradadoRosaFlores,
    alt: 'Degradado de nude a rosa y rojo, fotografiado sobre flores blancas',
  },
  {
    imagen: francesNeonExtension,
    alt: 'Uñas de gel con extensión y francesa en neón verde, rosa, amarillo y naranja',
    destacada: true,
  },
  {
    imagen: degradadoNaranja,
    alt: 'Degradado de naranja a coral en forma almendra',
  },
  {
    imagen: rosaNeonFrancesa,
    alt: 'Rosa neón con francesa invertida en blanco',
  },
  {
    imagen: rosaNeonFloral,
    alt: 'Rosa neón combinado con un diseño floral multicolor sobre base blanca',
  },
  {
    imagen: neonArcoiris,
    alt: 'Neones lisos combinados con un degradado arcoíris pintado a mano alzada',
  },
]
