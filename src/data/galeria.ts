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
import rojoAlmendraClasico from '../assets/galeria/rojo-almendra-clasico.jpg'
import rojoClasicoCorta from '../assets/galeria/rojo-clasico-corta.jpg'
import turquesaLisoCuadrada from '../assets/galeria/turquesa-liso-cuadrada.jpg'
import turquesaLisoManicura from '../assets/galeria/turquesa-liso-manicura.jpg'
import francesTurquesaNude from '../assets/galeria/frances-turquesa-nude.jpg'
import francesTurquesaCorta from '../assets/galeria/frances-turquesa-corta.jpg'
import rosaPastelAlmendra from '../assets/galeria/rosa-pastel-almendra.jpg'
import pedicuraRosaPastel from '../assets/galeria/pedicura-rosa-pastel.jpg'
import rosaNeonFlores from '../assets/galeria/rosa-neon-flores.jpg'
import francesTurquesaFloral from '../assets/galeria/frances-turquesa-floral.jpg'
import pedicuraRosaCorta from '../assets/galeria/pedicura-rosa-corta.jpg'

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

/** Nombre visible de cada filtro. Las categorías internas no se muestran tal cual. */
export const etiquetasCategoria: Record<CategoriaTrabajo, string> = {
  manos: 'Manicura',
  pies: 'Pedicura',
  gel: 'Uñas de gel',
  diseno: 'Diseño',
}

export type Trabajo = {
  imagen: ImageMetadata
  /** Título breve que identifica el trabajo en el visor. */
  titulo?: string
  alt: string
  /** Texto que aparece en la tarjeta al pasar el ratón o enfocarla. */
  descripcion?: string
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
    descripcion: 'Almendra negra con efecto carey y una flor difuminada, un diseño intenso y elegante.',
  },
  {
    imagen: francesBabyboomer,
    categorias: ['manos', 'diseno'],
    alt: 'Francesa babyboomer: degradado de nude a blanco sin línea marcada',
    descripcion: 'Francesa babyboomer en nude y blanco, suave y luminosa.',
    destacada: true,
  },
  {
    imagen: rojoRosaPintada,
    categorias: ['manos', 'diseno'],
    alt: 'Manicura roja con una rosa y hojas pintadas a mano sobre base nude',
    descripcion: 'Base nude con una rosa y hojas pintadas a mano para un acabado único.',
  },
  {
    imagen: nudeNaturalBrillo,
    categorias: ['manos'],
    alt: 'Uñas naturales cortas con acabado nude de alto brillo',
    descripcion: 'Uña natural corta en nude, limpia y con brillo espejo.',
  },
  {
    imagen: degradadoLilaNegro,
    categorias: ['manos', 'gel', 'diseno'],
    alt: 'Degradado de lila a negro con pedrería plateada en el anular',
    descripcion: 'Degradado de lila a negro con un toque de pedrería plateada.',
  },
  {
    imagen: pedicuraRojo,
    categorias: ['pies', 'manos'],
    alt: 'Pedicura y manicura a juego en rojo intenso',
    descripcion: 'Manicura y pedicura a juego en rojo intenso.',
    destacada: true,
  },
  {
    imagen: nudeCremoso,
    categorias: ['manos'],
    alt: 'Almendra corta en nude cremoso con acabado satinado',
    descripcion: 'Almendra corta en nude cremoso y acabado satinado.',
  },
  {
    imagen: turquesaMarmol,
    categorias: ['manos', 'diseno'],
    alt: 'Degradado turquesa con vetas negras de mármol trazadas a mano',
    descripcion: 'Turquesa degradado con vetas negras de mármol dibujadas a mano.',
  },
  {
    imagen: lilaPastel,
    categorias: ['manos', 'gel'],
    alt: 'Almendra larga en lila pastel con purpurina fina',
    descripcion: 'Almendra larga en lila pastel con un velo de purpurina fina.',
  },
  {
    imagen: rojoDisenoBn,
    categorias: ['manos', 'diseno'],
    alt: 'Uñas rojas con un diseño en blanco y negro pintado a mano',
    descripcion: 'Rojo intenso combinado con un diseño gráfico en blanco y negro.',
    destacada: true,
  },
  {
    imagen: purpurinaCoral,
    categorias: ['manos', 'diseno'],
    alt: 'Combinación de purpurina coral, rosa empolvado y blanco roto en forma cuadrada',
    descripcion: 'Coral, rosa empolvado y blanco roto con purpurina en forma cuadrada.',
  },
  {
    imagen: coralLiso,
    categorias: ['manos'],
    alt: 'Almendra en coral liso con brillo espejo',
    descripcion: 'Almendra en coral liso con un brillo limpio y luminoso.',
  },
  {
    imagen: fucsiaTornasolado,
    categorias: ['manos'],
    alt: 'Fucsia tornasolado con reflejo violeta sobre tul blanco',
    descripcion: 'Fucsia tornasolado con reflejos violetas.',
  },
  {
    imagen: degradadoRosaFlores,
    categorias: ['manos', 'diseno'],
    alt: 'Degradado de nude a rosa y rojo, fotografiado sobre flores blancas',
    descripcion: 'Degradado de nude a rosa y rojo con un acabado romántico.',
  },
  {
    imagen: francesNeonExtension,
    categorias: ['gel', 'diseno'],
    alt: 'Uñas de gel con extensión y francesa en neón verde, rosa, amarillo y naranja',
    descripcion: 'Extensión de gel con francesa neón multicolor, para llevar las manos al centro.',
    destacada: true,
  },
  {
    imagen: degradadoNaranja,
    categorias: ['manos'],
    alt: 'Degradado de naranja a coral en forma almendra',
    descripcion: 'Almendra en degradado de naranja a coral.',
  },
  {
    imagen: rosaNeonFrancesa,
    categorias: ['manos', 'diseno'],
    alt: 'Rosa neón con francesa invertida en blanco',
    descripcion: 'Rosa neón con francesa invertida en blanco.',
  },
  {
    imagen: rosaNeonFloral,
    categorias: ['manos', 'diseno'],
    alt: 'Rosa neón combinado con un diseño floral multicolor sobre base blanca',
    descripcion: 'Rosa neón y flores multicolor sobre una base blanca.',
  },
  {
    imagen: neonArcoiris,
    categorias: ['manos', 'diseno'],
    alt: 'Neones lisos combinados con un degradado arcoíris pintado a mano alzada',
    descripcion: 'Colores neón lisos con un degradado arcoíris pintado a mano alzada.',
  },
  {
    imagen: rojoAlmendraClasico,
    titulo: 'Rojo clásico almendrado',
    categorias: ['manos'],
    alt: 'Manicura roja brillante en uñas largas de forma almendrada',
    descripcion: 'Rojo clásico de alto brillo sobre una elegante forma almendrada.',
  },
  {
    imagen: rojoClasicoCorta,
    titulo: 'Rojo clásico corto',
    categorias: ['manos'],
    alt: 'Manicura roja brillante en uñas cortas y redondeadas',
    descripcion: 'Rojo intenso y uniforme en una manicura corta, limpia y atemporal.',
  },
  {
    imagen: turquesaLisoCuadrada,
    titulo: 'Turquesa liso cuadrado',
    categorias: ['manos'],
    alt: 'Manicura turquesa brillante en uñas cuadradas',
    descripcion: 'Turquesa vibrante y brillante en una forma cuadrada muy pulida.',
  },
  {
    imagen: turquesaLisoManicura,
    titulo: 'Turquesa brillante',
    categorias: ['manos'],
    alt: 'Manicura turquesa brillante en uñas de forma cuadrada',
    descripcion: 'Un turquesa luminoso que destaca por su acabado espejo.',
  },
  {
    imagen: francesTurquesaNude,
    titulo: 'Francesa turquesa sobre nude',
    categorias: ['manos', 'diseno'],
    alt: 'Uñas nude con punta francesa en turquesa',
    descripcion: 'Base nude natural con una punta francesa turquesa fresca y delicada.',
  },
  {
    imagen: francesTurquesaCorta,
    titulo: 'Francesa turquesa corta',
    categorias: ['manos', 'diseno'],
    alt: 'Uñas cortas nude con francesa turquesa y brillo',
    descripcion: 'Francesa turquesa en uña corta para un resultado discreto y luminoso.',
  },
  {
    imagen: rosaPastelAlmendra,
    titulo: 'Rosa pastel almendrado',
    categorias: ['manos'],
    alt: 'Manicura rosa pastel brillante en uñas almendradas',
    descripcion: 'Rosa pastel cremoso en forma almendrada, suave y muy femenina.',
  },
  {
    imagen: pedicuraRosaPastel,
    titulo: 'Pedicura rosa pastel',
    categorias: ['pies'],
    alt: 'Pedicura rosa pastel brillante en uñas de los pies',
    descripcion: 'Pedicura rosa pastel con acabado brillante y cuidado impecable.',
  },
  {
    imagen: rosaNeonFlores,
    titulo: 'Rosa neón y flores',
    categorias: ['manos', 'diseno'],
    alt: 'Manicura rosa neón y verde agua con una uña decorada con flores',
    descripcion: 'Rosa neón, verde agua y una uña floral multicolor llena de alegría.',
    destacada: true,
  },
  {
    imagen: francesTurquesaFloral,
    titulo: 'Francesa turquesa floral',
    categorias: ['manos', 'diseno'],
    alt: 'Francesa turquesa sobre nude con flores blancas pintadas a mano',
    descripcion: 'Francesa turquesa sobre nude con pequeños detalles florales pintados a mano.',
  },
  {
    imagen: pedicuraRosaCorta,
    titulo: 'Pedicura rosa corta',
    categorias: ['pies'],
    alt: 'Pedicura rosa pastel en uñas cortas de los pies',
    descripcion: 'Rosa pastel uniforme para una pedicura corta, cuidada y luminosa.',
  },
]
