import agroImg from '../../assets/images/agriculture.jpg';
import audioImg from '../../assets/images/audiovisual.jpg';
import realStateImg from '../../assets/images/realstate.jpg';
import securityImg from '../../assets/images/security.jpg';
import adventureImg from '../../assets/images/adventure.jpg';
import filmImg from '../../assets/images/film.jpg';

const categories = [
  {
    name: 'Agricola',
    url: 'https://assets6.lottiefiles.com/packages/lf20_hdype8za.json',
    hero_url: agroImg,
    abstract:
      'En la industria agricola los drones pueden tener diferentes aplicaciones que permiten tener un mayor control y monitoreo avanzado de los cultivos. Ofrecemos modelos en diferentes rangos de precio que se pueden ajustar a tareas sencillas como monitorear trabajos de recoleccion, hasta modelos mas avanzados que con el complemento de sensores y equipos de medicion especializados se puede tenre monitoreo de temperatura, humedad, etc, lo que permite tomar mejores decisiones de manera mas eficiente y rapida.',
  },

  {
    id: 2,
    name: 'Aventura',
    url: 'https://assets6.lottiefiles.com/packages/lf20_e6FSqJ/data.json',
    hero_url: adventureImg,
    abstract:
      'Eres amante de la naturaleza, los deportes extremos o te gustan las actividades al aire libre? Con nuestros drones puedes mejorar tu experiencia en cualquiera de estas actividades. Ofrecemos modelos que te permiten explorar de forma rapida grandes areas y encontrar ese lugar ideal para acampar o simplemente la ruta indicada para llegar al lugar que estas buscando. Para los amantes de los deportes extremos, tenemos modelos con funcionalidades de seguimiento automatico, lo que permite generar tomas increibles sin necesidad de tener un camarografo especializado.',
  },
  {
    id: 3,
    name: 'Seguridad',
    url: 'https://assets6.lottiefiles.com/packages/lf20_ezzwo7kd.json',
    hero_url: securityImg,
    abstract:
      'Los drones especializados en seguridad son ideales para monitorear de forma rapida grandes extensiones de terreno. Adicional con los sensores de imagenes termicas y vision nocturna tendra la seguridad de captar todos los detalles necesarios incluso en condiciones de poca luz. Estos modelos son ideales para industrias mineras, cultivos, parques, grandes almacenes.',
  },
  {
    id: 4,
    name: 'Cine',
    url: 'https://assets7.lottiefiles.com/packages/lf20_feuwapl6.json',
    hero_url: filmImg,
    abstract:
      'Uno de los grandes retos de la industria del cine son las tomas aereas, anteriormente se necesitaba de un helicoptero y todo un equipo especializado para poder realizar este tipo de tomas. Con nuestros modelos de drones especializados para esta industria, esto ya no es necesario y por unos cientos de dolares a la semana se pueden lograr tomas profesionales y de gran calidad.',
  },

  {
    id: 5,
    name: 'Inmobiliaria',
    url: 'https://assets7.lottiefiles.com/packages/lf20_kuiykf08.json',
    hero_url: realStateImg,
    abstract:
      'La toma de imagenes y video de edificios, casas y terrenos nunca ha sido tan facil. Con nuestros drones equipados con lentes especializados se pueden lograr tomas panoramicas como tambien de detalles en unos pocos minutos. Estos drones tambien permiten realizar inspecciones a fachadas, techos y general lugares de dificil acceso y donde se requiere una calidad de imagen alta para poder observar los detalles mas especificos.',
  },
  {
    id: 6,
    name: 'Fotografia',
    url: 'https://assets2.lottiefiles.com/packages/lf20_jhlaooj5.json',
    hero_url: audioImg,
    abstract: '',
  },
];

export default categories;
