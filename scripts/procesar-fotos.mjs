/**
 * Cura el material fotografico de origen para la galeria de la web.
 *
 * - Renombra a nombres semanticos, para que sustituir una foto sea copiar un archivo.
 * - Recorta la basura visual de los bordes (bandas de texto, pegatinas de Stories).
 * - Normaliza todo a 4:5 vertical: sin un encuadre comun, el mosaico parece amateur.
 *
 * Uso: node scripts/procesar-fotos.mjs
 *
 * Cuando lleguen las fotos nuevas, basta con apuntar ORIGEN a la carpeta nueva y
 * ajustar la lista PIEZAS. Los nombres de destino deben mantenerse para no tocar
 * src/data/galeria.ts.
 */
import sharp from 'sharp'
import { mkdir, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const RAIZ = new URL('..', import.meta.url).pathname

const ORIGEN = join(RAIZ, 'assets-source/instagram/instagram/nanci.nails_nn')
const DESTINO = join(RAIZ, 'src/assets/galeria')
const DESTINO_MARCA = join(RAIZ, 'assets-source/marca')

const RATIO = 4 / 5

/**
 * recorte: fraccion a eliminar de cada borde ANTES de normalizar el ratio.
 * El orden de la lista es el orden curado de la galeria.
 */
const PIEZAS = [
  { id: '3763697777906624069', nombre: 'almendra-negra-carey' },
  { id: '3713489741179038407', nombre: 'frances-babyboomer-nude' },
  { id: '3554268517697202779', nombre: 'rojo-rosa-pintada-a-mano' },
  { id: '3644490671495126325', nombre: 'nude-natural-brillo' },
  { id: '3547056532119271613', nombre: 'degradado-lila-negro' },
  { id: '3694483932091327785', nombre: 'pedicura-rojo-intenso' },
  { id: '3547814981652303500', nombre: 'nude-cremoso-almendra' },
  { id: '3704606594590520073', nombre: 'turquesa-lineas-marmol' },
  { id: '3692302613529931737', nombre: 'lila-pastel-purpurina' },
  { id: '3642411877141782334', nombre: 'purpurina-coral-rosa' },
  { id: '3693018756477426705', nombre: 'coral-liso-almendra' },
  { id: '3702451244568303896', nombre: 'rojo-diseno-blanco-negro' },
  { id: '3581127554657065361', nombre: 'fucsia-tornasolado' },
  { id: '3656808319327211422', nombre: 'degradado-rosa-flores' },
  { id: '3675917517079052387', nombre: 'degradado-naranja-coral' },
  { id: '3707520397916246342', nombre: 'rosa-neon-frances-invertida' },
  { id: '3657653857651017178', nombre: 'rosa-neon-diseno-floral' },
  { id: '3691570595393364826', nombre: 'neon-multicolor-arcoiris' },
  // Arrastra texto sobreimpreso abajo: se recorta antes de encuadrar.
  { id: '3698086143493036692', nombre: 'frances-neon-extension', recorte: { abajo: 0.16 } },
]

// El logo actual (rosa, caligrafico). No entra en la web: se archiva como referencia.
const MARCA = [{ id: '3604138280567866960', nombre: 'logo-actual-rosa' }]

// Fuera: pegatinas encima de las unas, interfaz de Instagram, fondo desordenado.
// Y las apaisadas que, al llevarlas a 4:5, parten la marca de agua por la mitad.
const DESCARTADAS = {
  '3536277813615226946': 'pegatina de gato encima de la mano',
  '3567359362285505060': 'pegatina de palmera sobre la una',
  '3701442966165937254': 'barra de interfaz de Instagram y logo pegado',
  '3711418091327470538': 'foto insertada en circulo sobre la imagen',
  '3697342873313803080': 'fondo desordenado con material del salon',
  '3559345971327426368': 'apaisada: a 4:5 corta la marca de agua',
  '3545634365334859733': 'apaisada: a 4:5 corta la marca de agua',
}

/**
 * Detecta las bandas lisas que Instagram añade arriba y abajo al cuadrar una
 * foto apaisada. Sobre el fondo negro de la galería esas bandas cantan mucho.
 *
 * Se analiza el mapa de píxeles en crudo fila a fila: una fila es banda si es
 * casi uniforme (poca diferencia entre su píxel más claro y el más oscuro).
 */
async function detectarBandas(entrada) {
  const { data, info } = await sharp(entrada)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  const UNIFORME = 12 // margen de tolerancia sobre 255
  const LIMITE = 0.25 // no se recorta más de un cuarto por borde

  const filaEsBanda = (y) => {
    let min = 255
    let max = 0
    // Muestreo cada 4 píxeles: suficiente para detectar uniformidad.
    for (let x = 0; x < width; x += 4) {
      const i = (y * width + x) * channels
      for (let c = 0; c < channels; c++) {
        const v = data[i + c]
        if (v < min) min = v
        if (v > max) max = v
      }
      if (max - min > UNIFORME) return false
    }
    return true
  }

  const maximo = Math.floor(height * LIMITE)
  let arriba = 0
  while (arriba < maximo && filaEsBanda(arriba)) arriba++
  let abajo = 0
  while (abajo < maximo && filaEsBanda(height - 1 - abajo)) abajo++

  // Una o dos filas uniformes son ruido de compresión, no una banda.
  return {
    arriba: arriba > 6 ? arriba : 0,
    abajo: abajo > 6 ? abajo : 0,
  }
}

async function procesar({ id, nombre, recorte }, destino) {
  const entrada = join(ORIGEN, `${id}.jpg`)
  let pipeline = sharp(entrada)
  const { width, height } = await pipeline.metadata()

  let w = width
  let h = height

  // Las bandas lisas se quitan siempre; el recorte manual se suma encima.
  const bandas = await detectarBandas(entrada)
  const arriba = bandas.arriba + Math.round(height * (recorte?.arriba ?? 0))
  const abajo = bandas.abajo + Math.round(height * (recorte?.abajo ?? 0))

  if (arriba || abajo) {
    h = height - arriba - abajo
    pipeline = pipeline.extract({ left: 0, top: arriba, width: w, height: h })
  }

  // Normaliza a 4:5 recortando el exceso desde el centro.
  let finalW = w
  let finalH = Math.round(w / RATIO)
  if (finalH > h) {
    finalH = h
    finalW = Math.round(h * RATIO)
  }

  await sharp(await pipeline.toBuffer())
    .extract({
      left: Math.round((w - finalW) / 2),
      top: Math.round((h - finalH) / 2),
      width: finalW,
      height: finalH,
    })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(join(destino, `${nombre}.jpg`))

  return {
    nombre,
    origen: `${width}x${height}`,
    salida: `${finalW}x${finalH}`,
    bandas: bandas.arriba || bandas.abajo ? `${bandas.arriba}/${bandas.abajo}px` : '',
  }
}

await mkdir(DESTINO, { recursive: true })
await mkdir(DESTINO_MARCA, { recursive: true })

const disponibles = new Set((await readdir(ORIGEN)).map((f) => f.replace('.jpg', '')))
const faltantes = [...PIEZAS, ...MARCA].filter((p) => !disponibles.has(p.id))
if (faltantes.length) {
  console.error('Faltan archivos de origen:', faltantes.map((f) => f.id).join(', '))
  process.exit(1)
}

const galeria = []
for (const pieza of PIEZAS) galeria.push(await procesar(pieza, DESTINO))
for (const pieza of MARCA) await procesar(pieza, DESTINO_MARCA)

/*
 * Encuadre propio para el hero.
 *
 * El hueco del hero es apaisado y las fotos de galería son verticales (4:5).
 * Recortar una vertical dentro de un hueco horizontal deja solo los dedos y se
 * come las uñas, que son justamente el producto.
 *
 * El hueco de la foto en escritorio es casi cuadrado (entre 1.0 y 1.2 de
 * proporción, según la resolución), porque la imagen ocupa toda la altura de
 * la pantalla bajo la cabecera. Se genera por tanto un encuadre 1:1 desde el
 * borde superior, que es donde están las uñas: cualquier recorte posterior se
 * lleva bordes, nunca el trabajo.
 *
 * Un encuadre apaisado aquí obligaba a `cover` a ampliar muchísimo y dejaba
 * solo tres uñas gigantes.
 */
const ORIGEN_HERO = join(ORIGEN, `${PIEZAS[0].id}.jpg`)
const metaHero = await sharp(ORIGEN_HERO).metadata()
const bandasHero = await detectarBandas(ORIGEN_HERO)
const topeHero = bandasHero.arriba
const altoHero = Math.min(
  metaHero.width,
  metaHero.height - topeHero - bandasHero.abajo,
)
await sharp(ORIGEN_HERO)
  .extract({ left: 0, top: topeHero, width: metaHero.width, height: altoHero })
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(join(RAIZ, 'src/assets/hero.jpg'))

/*
 * Imagen de vista previa al compartir el enlace (1200x630).
 *
 * Importa más de lo que parece: el canal de reserva es WhatsApp, así que cada
 * vez que una clienta reenvíe la web a una amiga, esta imagen es la primera
 * impresión. Sin ella, el enlace aparece como un rectángulo gris.
 *
 * Solo fotografía, sin texto sobreimpreso: rotular aquí exigiría la Bodoni
 * instalada en el sistema, y una tipografía que no es la de la marca queda
 * peor que ninguna.
 */
const ORIGEN_OG = join(ORIGEN, `${PIEZAS[0].id}.jpg`)
const og = sharp(ORIGEN_OG)
const metaOg = await og.metadata()
const anchoOg = metaOg.width
const altoOg = Math.round(anchoOg / (1200 / 630))
await sharp(ORIGEN_OG)
  .extract({
    left: 0,
    top: Math.round((metaOg.height - altoOg) / 2),
    width: anchoOg,
    height: Math.min(altoOg, metaOg.height),
  })
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(join(RAIZ, 'public/og.jpg'))

console.log(`Galeria: ${galeria.length} imagenes normalizadas a 4:5`)
for (const g of galeria) {
  const nota = g.bandas ? `  (banda lisa recortada: ${g.bandas})` : ''
  console.log(`  ${g.nombre}.jpg  ${g.origen} -> ${g.salida}${nota}`)
}
console.log(`\nLogo archivado en assets-source/marca/`)
console.log(`Descartadas: ${Object.keys(DESCARTADAS).length}`)
for (const [id, motivo] of Object.entries(DESCARTADAS)) console.log(`  ${id} — ${motivo}`)
