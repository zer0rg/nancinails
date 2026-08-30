/**
 * Páginas de servicio local.
 *
 * Por qué existen: la web antigua tenía cinco URLs con el municipio en el slug
 * y son las que sostienen el posicionamiento (ver `SEO.md`). La portada es una
 * sola página y no puede ser a la vez la mejor respuesta a "manicura en Rivas",
 * "pedicura en Rivas" y "uñas de gel en Rivas". Google necesita tres
 * documentos, no uno.
 *
 * Cómo NO se han escrito: no son páginas de relleno con la misma plantilla y el
 * municipio cambiado. Ese era exactamente el problema de la web antigua, donde
 * manicura, pedicura y gel compartían el 80 % del texto y se canibalizaban
 * entre sí. Aquí cada texto responde a una duda distinta y no se repite.
 *
 * La portada no se toca. Estas páginas son puertas de entrada desde búsqueda:
 * quien llega buscando "pedicura en Rivas" aterriza directamente aquí y nunca
 * ve una versión diluida de nada.
 */
import type { CategoriaTrabajo } from './galeria'
import { negocio, horarioResumen } from './negocio'

export type SeccionTexto = {
  titulo: string
  parrafos: string[]
}

export type Pregunta = {
  pregunta: string
  respuesta: string
}

export type PaginaServicio = {
  /** Se convierte en la URL: /{slug}/ */
  slug: string
  /**
   * El keyword va DELANTE, no detrás.
   *
   * La web antigua titulaba estas páginas "Manicura | Nanci Nails": la URL
   * llevaba el municipio pero el título, que es lo que Google pondera y lo que
   * el usuario lee en los resultados, no lo mencionaba. Era el fallo más caro
   * de toda la web.
   */
  titulo: string
  descripcion: string
  /** Titular editorial en tres partes, como el de la portada. */
  h1: { lineas: string[]; enfasis: string }
  entradilla: string
  /** Texto del enlace en la navegación y en las migas de pan. */
  etiqueta: string
  /** Para el marcado `Service` de schema.org. */
  servicio: { nombre: string; descripcion: string }
  /** Se inserta en el mensaje de WhatsApp: "…pedir cita para {servicio}". */
  servicioWhatsapp: string
  /** Qué fotos de la galería se muestran. */
  categoriaGaleria: CategoriaTrabajo
  /** Ids de `grupos` en servicios.ts cuyas tarifas se listan. */
  gruposTarifas: string[]
  secciones: SeccionTexto[]
  faq: Pregunta[]
}

export const paginasServicio: PaginaServicio[] = [
  {
    slug: 'manicura-rivas-vaciamadrid',
    titulo: 'Manicura en Rivas Vaciamadrid · Nanci Nails',
    descripcion:
      'Manicura express, spa y esmaltado permanente en el C.C. Santa Mónica de Rivas Vaciamadrid. Consulta los servicios y pide cita por WhatsApp.',
    h1: { lineas: ['Manicura en'], enfasis: 'Rivas Vaciamadrid' },
    entradilla:
      'En el Centro Comercial Santa Mónica. Manicura cuidada, esmaltado permanente que aguanta y diseño hecho a mano.',
    etiqueta: 'Manicura',
    servicio: {
      nombre: 'Manicura',
      descripcion:
        'Manicura express, manicura spa y esmaltado permanente en Rivas Vaciamadrid.',
    },
    servicioWhatsapp: 'una manicura',
    categoriaGaleria: 'manos',
    gruposTarifas: ['manos', 'diseno'],
    secciones: [
      {
        titulo: 'Qué incluye una manicura aquí',
        parrafos: [
          'Toda manicura empieza igual: limado hasta dejar la forma que has pedido, trabajo de cutícula sin arrancar nada y limpieza del contorno. Ese es el suelo. Lo que cambia de un servicio a otro es lo que viene después.',
          'La manicura express está pensada para mantener entre citas. Veinticinco minutos, forma y cutícula, sin tratamiento. Es la que te resuelve la semana cuando has salido del trabajo y tienes algo a las ocho.',
          'La manicura spa añade exfoliación, mascarilla e hidratación con productos Kinetics. La diferencia se nota sobre todo en invierno, cuando la piel de las manos se reseca y agrieta: no es un extra decorativo, es lo que evita que la cutícula vuelva a levantarse a los cuatro días.',
        ],
      },
      {
        titulo: 'Esmaltado permanente: cuánto aguanta de verdad',
        parrafos: [
          'El esmaltado permanente es color en gel que se cura bajo lámpara LED. Frente al esmalte tradicional, que empieza a saltarse al segundo o tercer día, aquí hablamos de tres semanas con el brillo intacto. No se raya al fregar ni se marca al abrir el coche.',
          'Tres semanas es el dato honesto, no el de folleto. A partir de ahí lo que se ve no es que el color se estropee, sino que la uña ha crecido y aparece la línea de la base. Quien tiene crecimiento rápido lo nota a las dos semanas y media; quien lo tiene lento aguanta cerca del mes.',
          'La duda que más se repite: no, el permanente bien retirado no estropea la uña. Lo que la estropea es arrancarlo tirando cuando empieza a levantar por un borde. Al hacerlo se lleva capas de la uña natural y la deja fina y sensible durante meses. Si te ha empezado a levantar antes de tiempo, pásate y te lo retiro; es más rápido y más barato que reparar el destrozo después.',
        ],
      },
      {
        titulo: 'Diseño: de la francesa al dibujo a mano alzada',
        parrafos: [
          'El diseño se añade a cualquiera de los servicios anteriores y depende del detalle. Una francesa clásica o una babyboomer degradada dan un acabado limpio y elegante. Un dibujo a mano alzada (flores, mármol, carey, líneas finas) se adapta a las uñas que quieras decorar, así que puedes llevar diseño solo en dos y liso en el resto.',
          'Si traes una foto de referencia, mejor. No hace falta que sea exacta: sirve para entender qué te gusta, si buscas algo discreto o algo que se vea desde lejos, y de ahí salimos.',
        ],
      },
      {
        titulo: 'Cómo hacer que te duren',
        parrafos: [
          'Aceite de cutícula todos los días. Es lo único que de verdad cambia el resultado y es lo que menos gente hace. Una uña hidratada por la base no levanta por el borde.',
          'Guantes para fregar y para los productos de limpieza. El agua caliente prolongada y los desengrasantes son lo que más acorta la vida de un permanente.',
          'Y no las uses de herramienta. Abrir latas, rascar etiquetas o quitar grapas con la uña es lo que provoca la mayoría de las roturas que veo.',
        ],
      },
    ],
    faq: [
      {
        pregunta: '¿Cuánto dura el esmaltado permanente?',
        respuesta:
          'Tres semanas manteniendo el brillo. A partir de ahí lo que se nota no es el desgaste del color, sino el crecimiento de la uña en la base. Con crecimiento rápido puede verse a las dos semanas y media.',
      },
      {
        pregunta: '¿Hace falta pedir cita?',
        respuesta: `Sí, se trabaja con cita para que nadie espere. Lo más cómodo es escribir por WhatsApp al ${negocio.contacto.movil} y cerrar el hueco en dos mensajes.`,
      },
      {
        pregunta: '¿El esmaltado permanente daña la uña?',
        respuesta:
          'Retirado correctamente, no. El daño viene de arrancarlo tirando cuando empieza a levantar, porque se lleva capas de la uña natural. Si te levanta antes de tiempo, pásate a que te lo retire.',
      },
      {
        pregunta: '¿Cuánto se tarda?',
        respuesta:
          'La manicura express, veinticinco minutos. La spa, cuarenta y cinco. Con esmaltado permanente incluido, alrededor de una hora.',
      },
      {
        pregunta: '¿Dónde estáis exactamente?',
        respuesta: `En el ${negocio.direccion.local} de ${negocio.direccion.ciudad}, con aparcamiento del propio centro. ${horarioResumen}.`,
      },
    ],
  },

  {
    slug: 'pedicura-rivas-vaciamadrid',
    titulo: 'Pedicura en Rivas Vaciamadrid · Nanci Nails',
    descripcion:
      'Pedicura spa y con esmaltado permanente en el C.C. Santa Mónica de Rivas Vaciamadrid. Consulta los servicios y pide cita por WhatsApp.',
    h1: { lineas: ['Pedicura en'], enfasis: 'Rivas Vaciamadrid' },
    entradilla:
      'Tratamiento completo, no solo color. Baño, exfoliación, trabajo de durezas y masaje, en el C.C. Santa Mónica.',
    etiqueta: 'Pedicura',
    servicio: {
      nombre: 'Pedicura',
      descripcion:
        'Pedicura spa, pedicura vip y pedicura con esmaltado permanente en Rivas Vaciamadrid.',
    },
    servicioWhatsapp: 'una pedicura',
    categoriaGaleria: 'pies',
    gruposTarifas: ['pies'],
    secciones: [
      {
        titulo: 'Una pedicura no es pintar las uñas de los pies',
        parrafos: [
          'Esa es la confusión más común y la razón por la que mucha gente cree que la pedicura es cara. Lo que se paga no es el color: es el trabajo que hay debajo.',
          'La pedicura spa empieza con baño para reblandecer, sigue con exfoliación, trabajo de durezas en talón y planta, corte y limado recto para prevenir uñas encarnadas, cutícula, y termina con masaje. Cincuenta minutos. Sales caminando distinto, y eso no es una frase de marketing: la mayoría de las molestias al andar vienen de durezas acumuladas, no de nada más serio.',
          'La versión vip alarga el tratamiento con mascarilla, parafina y masaje extendido. Ochenta minutos. Es la que tiene sentido si vienes dos o tres veces al año en lugar de cada mes, porque hace más trabajo de golpe.',
        ],
      },
      {
        titulo: 'Durezas y talones agrietados',
        parrafos: [
          'Las durezas no se quitan de una vez y quien te diga lo contrario te está vendiendo algo. Son la respuesta del pie a una presión que sigue ahí: el calzado, la pisada, las horas de pie. Se rebajan, se hidrata la zona y se mantiene.',
          'Lo que sí se consigue en una sesión es quitar la capa que molesta y frenar la grieta antes de que se abra. Los talones agrietados que llegan en verano, con sandalia, suelen venir de meses sin tratar. Cuanto antes se cogen, menos sesiones hacen falta.',
          'Aquí se trabaja con lima y torno, sin cuchilla. Es más lento y es lo correcto: la cuchilla quita más rápido pero deja el pie pidiendo callo otra vez, y a la larga la dureza vuelve más gruesa.',
        ],
      },
      {
        titulo: 'Por qué el permanente dura más en los pies',
        parrafos: [
          'En las manos el esmaltado permanente aguanta tres semanas. En los pies, entre cinco y seis. La razón es sencilla: la uña del pie crece bastante más despacio que la de la mano, y además no las usas para nada. No friegas con los pies ni abres cajas con ellos.',
          'Eso convierte la pedicura con permanente en el servicio con mejor relación entre lo que cuesta y lo que dura de toda la carta. Una sola cita te cubre mes y medio.',
          'En verano hay una ventaja extra que casi nadie tiene en cuenta: el permanente no se marca con la arena ni se estropea con el cloro de la piscina, cosa que el esmalte normal no aguanta ni un fin de semana.',
        ],
      },
      {
        titulo: 'Cada cuánto conviene venir',
        parrafos: [
          'Con permanente, cada cinco o seis semanas. Sin él, la pedicura de mantenimiento cada seis u ocho semanas es suficiente para que las durezas no vuelvan a acumularse.',
          'Si vienes solo antes del verano, se puede hacer, pero llegarás con más trabajo por delante y probablemente necesites la versión vip. Repartirlo sale mejor y cuesta menos.',
        ],
      },
    ],
    faq: [
      {
        pregunta: '¿Cuánto dura el esmaltado permanente en los pies?',
        respuesta:
          'Entre cinco y seis semanas, casi el doble que en las manos. La uña del pie crece más despacio y no se somete al desgaste diario de las manos.',
      },
      {
        pregunta: '¿La pedicura incluye quitar durezas?',
        respuesta:
          'Sí. El trabajo de durezas en talón y planta va incluido en la pedicura spa, junto con el baño, la exfoliación y el masaje. No es un extra aparte.',
      },
      {
        pregunta: '¿Se trabaja con cuchilla?',
        respuesta:
          'No. Se usa lima y torno. Es más lento, pero la cuchilla deja el pie generando callo de nuevo y a medio plazo la dureza vuelve más gruesa.',
      },
      {
        pregunta: '¿Cuánto dura la sesión?',
        respuesta:
          'La pedicura spa, cincuenta minutos. Con esmaltado permanente, sesenta y cinco. La versión vip, ochenta.',
      },
      {
        pregunta: '¿Dónde estáis y qué horario tenéis?',
        respuesta: `En el ${negocio.direccion.local} de ${negocio.direccion.ciudad}. ${horarioResumen}.`,
      },
    ],
  },

  {
    slug: 'unas-de-gel-rivas-vaciamadrid',
    titulo: 'Uñas de gel en Rivas Vaciamadrid · Nanci Nails',
    descripcion:
      'Uñas esculpidas en gel, relleno y retirada en el C.C. Santa Mónica de Rivas Vaciamadrid. Consulta los servicios y pide cita por WhatsApp.',
    h1: { lineas: ['Uñas de gel en'], enfasis: 'Rivas Vaciamadrid' },
    entradilla:
      'Extensión y estructura para quien quiere más longitud o más resistencia. Esculpido a medida en el C.C. Santa Mónica.',
    etiqueta: 'Uñas de gel',
    servicio: {
      nombre: 'Uñas de gel',
      descripcion:
        'Uñas esculpidas en gel, relleno y retirada en Rivas Vaciamadrid.',
    },
    servicioWhatsapp: 'unas uñas de gel',
    categoriaGaleria: 'gel',
    gruposTarifas: ['gel', 'diseno'],
    secciones: [
      {
        titulo: 'Gel o acrílico: en qué se diferencian',
        parrafos: [
          'Es la primera pregunta de casi todo el mundo, y la respuesta corta es que ninguno es mejor: son materiales distintos para manos distintas.',
          'El acrílico se forma mezclando polvo y líquido, endurece al aire y es el más resistente de los dos. Absorbe muy bien los impactos, así que es lo que recomiendo a quien trabaja mucho con las manos. A cambio es más rígido y el acabado, aunque hoy es muy bueno, resulta algo menos natural.',
          'El gel cura bajo lámpara LED, tiene más flexibilidad y da un acabado más fino y más brillante. Se ve más natural de cerca y es más cómodo de llevar. Es la opción de la mayoría de quienes buscan longitud sin que se note que llevan algo puesto.',
          'Si dudas, ven y lo vemos con tus manos delante. Depende de a qué te dedicas, de la longitud que quieras y de cómo tengas la uña natural.',
        ],
      },
      {
        titulo: 'Cómo se hace un esculpido',
        parrafos: [
          'Se prepara la uña natural, se coloca la base y a partir de ahí se construye la extensión. Se puede hacer sobre tip, un molde que se adhiere a la uña, o esculpiendo directamente sobre molde de papel, que da más control sobre la curva.',
          'La estructura es lo que separa un trabajo bueno de uno que se rompe a la semana. El grosor no puede ser uniforme: hace falta un punto de apoyo en la zona de estrés, justo donde acaba la uña natural, y afinar hacia el borde libre. Una uña plana y del mismo grosor de punta a base se parte por ahí sí o sí.',
          'La forma y la longitud las eliges tú: almendra, cuadrada, coffin. Lo único en lo que te voy a frenar es en pedir mucha longitud en una primera cita, porque hasta que te acostumbras se rompen más. Se puede subir en la siguiente.',
          'Son unas dos horas la primera vez. No es tiempo perdido: es el servicio que más manos requiere de toda la carta.',
        ],
      },
      {
        titulo: 'Relleno cada tres o cuatro semanas',
        parrafos: [
          'La uña crece y aparece un escalón en la base. El relleno rehace esa zona, reequilibra la estructura y devuelve el color. No se quita nada: se mantiene lo que ya hay.',
          'Tres o cuatro semanas es el margen, según lo rápido que te crezca. Pasarse no es solo estético: cuando la extensión queda desequilibrada, el punto de apoyo se desplaza y aumenta mucho el riesgo de rotura, que sale más caro que el relleno.',
          'Con mantenimiento se puede estar años sin retirar, rellenando y ya está. No hace falta descansar entre juegos si la uña de debajo está sana.',
        ],
      },
      {
        titulo: 'Retirada: nunca en casa',
        parrafos: [
          'Esto es lo importante de toda la página. El gel no se arranca. Se retira limando por capas y con el producto adecuado, y lleva media hora.',
          'Arrancar una extensión tirando se lleva capas de la uña natural. Queda fina, blanda y dolorida, y tarda entre tres y seis meses en recuperarse, que es lo que tarda una uña en renovarse por completo. La mayoría de la gente que dice "a mí el gel me estropeó las uñas" lo que hizo fue quitárselo en casa.',
          'La retirada es el servicio más barato de la carta por algo: prefiero que vengas a que te lo quite bien.',
        ],
      },
    ],
    faq: [
      {
        pregunta: '¿Qué es mejor, uñas de gel o acrílicas?',
        respuesta:
          'Ninguna es mejor en abstracto. El acrílico es más resistente a impactos y va bien si trabajas mucho con las manos; el gel es más flexible, más fino y de acabado más natural. Depende de tu día a día y de tu uña.',
      },
      {
        pregunta: '¿Cada cuánto hay que rellenar?',
        respuesta:
          'Cada tres o cuatro semanas, según tu ritmo de crecimiento. Pasarse de ese margen desequilibra la estructura y multiplica el riesgo de rotura.',
      },
      {
        pregunta: '¿Puedo quitarme el gel en casa?',
        respuesta:
          'No. Arrancarlo se lleva capas de la uña natural y tarda entre tres y seis meses en recuperarse. La retirada en salón se hace limando por capas y lleva media hora.',
      },
      {
        pregunta: '¿Cuánto se tarda en el primer esculpido?',
        respuesta:
          'Alrededor de dos horas. El relleno posterior baja a hora y cuarto, y la retirada a media hora.',
      },
      {
        pregunta: '¿Hay que descansar entre juegos de uñas?',
        respuesta:
          'Si la uña natural está sana y las retiradas se han hecho bien, no hace falta. Se puede mantener con rellenos indefinidamente.',
      },
    ],
  },
]

/** Busca una página por su slug. */
export function paginaPorSlug(slug: string): PaginaServicio | undefined {
  return paginasServicio.find((pagina) => pagina.slug === slug)
}

/**
 * Página que desarrolla un grupo de tarifas, si existe.
 *
 * Se empareja por el PRIMER id de `gruposTarifas`, que es el grupo del que trata
 * la página: manos → manicura, pies → pedicura, gel → uñas de gel. El grupo
 * "diseño" aparece en varias páginas como complemento y no tiene página propia,
 * así que devuelve `undefined` y simplemente no se enlaza.
 *
 * Sirve para enlazar cada grupo de la carta con su página desde la propia
 * sección de tarifas. Sin esto, las páginas de servicio solo colgarían del pie,
 * que es el patrón de las "doorway pages" que Google penaliza: páginas que
 * existen para el buscador pero no para quien navega. Si una página merece
 * posicionar, merece estar en el recorrido.
 */
export function paginaDeGrupo(idGrupo: string): PaginaServicio | undefined {
  return paginasServicio.find((pagina) => pagina.gruposTarifas[0] === idGrupo)
}
