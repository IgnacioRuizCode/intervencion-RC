import './Community.css'
import Martina from '../../assets/community-images/women/community-woman-1.webp'
import Camila from '../../assets/community-images/women/community-woman-2.webp'
import Sofia from '../../assets/community-images/women/community-woman-3.webp'
import Lucia from '../../assets/community-images/women/community-woman-4.webp'
import Florencia from '../../assets/community-images/women/community-woman-5.webp'
import Julieta from '../../assets/community-images/women/community-woman-6.webp'
import Valentina from '../../assets/community-images/women/community-woman-7.webp'
import Nicolas from '../../assets/community-images/men/community-man-1.webp'
import Federico from '../../assets/community-images/men/community-man-2.webp'
import Lucas from '../../assets/community-images/men/community-man-3.webp'
import Agustin from '../../assets/community-images/men/community-man-4.webp'
import Tomas from '../../assets/community-images/men/community-man-5.webp'
import Joaquin from '../../assets/community-images/men/community-man-6.webp'
import Santiago from '../../assets/community-images/men/community-man-7.webp'
import Mateo from '../../assets/community-images/men/community-man-8.webp'
import TrecePPresentation from '../../assets/community-images/stand-alone-pics/13p-presentation.webp'
import TrecePRuddys from '../../assets/community-images/stand-alone-pics/13p-ruddys.webp'
import TrecePThrusday from '../../assets/community-images/stand-alone-pics/13p-thursday.webp'
import SMClass from '../../assets/community-images/stand-alone-pics/sm-class.webp'
import RollingMundial from '../../assets/community-images/stand-alone-pics/rolling-mundial.webp'

// Community.tsx
type Testimony =
  | { type: "image"; src: string; alt: string }
  | { type: "testimonial"; name: string; course: string; text: string; avatar: string };

const col1: Testimony[] = [
     {
    type: "testimonial",
    name: "Martina López",
    course: "Full Stack",
    text: "Arranqué el curso sin saber muy bien por dónde empezar y terminé desarrollando mis propios proyectos. Me encantó poder aprender tanto de frontend como de backend y entender cómo funciona una aplicación de principio a fin.",
    avatar: Martina,
  },
       {
    type: "testimonial",
    name: "Federico Morales",
    course: "Scrum Master",
    text: "El curso me ayudó a comprender mejor las metodologías ágiles y el rol del Scrum Master dentro de un equipo. Me llevo herramientas que puedo aplicar tanto en proyectos de desarrollo como en mi trabajo diario.",
    avatar: Federico,
  },
        {
    type: "image",
    src: TrecePRuddys,
    alt: "estudiantes almorzando"
  },
       {
    type: "testimonial",
    name: "Valentina Díaz",
    course: "Scrum Master",
    text: "Me pareció una excelente experiencia. Aprendí a organizar tareas, facilitar la comunicación entre equipos y entender la importancia de las retrospectivas. Es un curso que recomiendo para quienes quieren crecer profesionalmente.",
    avatar: Valentina,
  },
       {
    type: "testimonial",
    name: "Lucas Benítez",
    course: "Git y Github",
    text: "Antes trabajaba con Git de manera bastante básica. Con este curso aprendí a manejar ramas, resolver conflictos y colaborar con otros desarrolladores de una forma mucho más ordenada. ¡Me sirvió un montón!",
    avatar: Lucas,
  },
       {
    type: "image",
    src: RollingMundial,
    alt: "estudiantes viendo el partido de Argentina"
  },
       {
    type: "testimonial",
    name: "Sofía Martínez",
    course: "Ready to Code",
    text: "Un curso súper completo para quienes ya tenemos conocimientos de programación y queremos dar el siguiente paso. Me ayudó a incorporar nuevas herramientas y entender mejor cómo funcionan los equipos de desarrollo.",
    avatar: Sofia,
  },
];
const col2: Testimony[] = [
      {
    type: "testimonial",
    name: "Nicolás Fernández",
    course: "Full Stack",
    text: "Lo que más me gustó fue la parte práctica. Aprender React, conectar una API y trabajar con bases de datos me ayudó a entender cómo se construyen aplicaciones reales. Hoy tengo mucha más confianza para seguir creciendo como desarrollador.",
    avatar: Nicolas,
  },
       {
    type: "testimonial",
    name: "Julieta Romero",
    course: "Full Stack",
    text: "El curso me permitió transformar mis conocimientos en proyectos concretos. Me gustó mucho la dinámica de aprendizaje y poder aplicar cada concepto a medida que avanzaba. Siento que tengo una base mucho más sólida.",
    avatar: Julieta,
  },
       {
    type: "image",
    src: TrecePPresentation,
    alt: "estudiantes en la presentación del proyecto"
  },
       {
    type: "testimonial",
    name: "Joaquín Perez",
    course: "Ready to Code",
    text: "Me pareció una propuesta excelente para fortalecer mis conocimientos técnicos. Los módulos son claros, prácticos y están muy bien organizados. Los tests también me ayudaron a reforzar lo aprendido antes de avanzar.",
    avatar: Joaquin,
  },
       {
    type: "testimonial",
    name: "Florencia Castro",
    course: "SQL",
    text: "Siempre me había interesado el mundo de las bases de datos, pero no sabía por dónde empezar. El curso me permitió aprender SQL desde una base sólida y practicar consultas de una manera muy clara y dinámica.",
    avatar: Florencia,
  },
       {
    type: "testimonial",
    name: "Mateo Sánchez",
    course: "Claude Code",
    text: "Un curso que realmente cambia la forma de pensar el desarrollo. Me gustó aprender a integrar IA en mi workflow, automatizar tareas repetitivas y utilizar herramientas como MCPs para trabajar de manera más eficiente.",
    avatar: Mateo,
  },
];

const col3: Testimony[] = [
      {
    type: "testimonial",
    name: "Camila Torres",
    course: "Scrum Master",
    text: "Aprendí muchísimo sobre cómo organizar un equipo de trabajo y gestionar proyectos de manera más eficiente. Me gustó especialmente entender cómo funciona Scrum en situaciones reales y no solamente desde la teoría.",
    avatar: Camila,
  },
       {
    type: "image",
    src: SMClass,
    alt: "estudiantes de la clase de Scrum Master"
  },
       {
    type: "testimonial",
    name: "Agustín Herrera",
    course: "Git y Github",
    text: "Me encantó aprender a trabajar con GitHub de manera profesional. Ahora entiendo mucho mejor cómo organizar mis proyectos, hacer commits y colaborar en equipo. Sin dudas, una herramienta fundamental para cualquier programador.",
    avatar: Agustin,
  },
       {
    type: "testimonial",
    name: "Tomás Acosta",
    course: "Ready to Code",
    text: "Lo que más me gustó fue conocer cómo se trabaja realmente en la industria. Aprendí buenas prácticas, metodologías y herramientas que me ayudaron a mejorar mi forma de programar y organizar mis proyectos.",
    avatar: Tomas,
  },
       {
    type: "image",
    src: TrecePThrusday,
    alt: "estudiantes en clases de consulta"
  },
       {
    type: "testimonial",
    name: "Santiago Ruiz",
    course: "SQL",
    text: "Me gustó mucho la modalidad on-demand porque pude avanzar a mi propio ritmo. Aprendí a consultar, filtrar y manipular datos, y ahora tengo una herramienta más para aplicar en mis proyectos.",
    avatar: Santiago,
  },
       {
    type: "testimonial",
    name: "Lucia Gonzalez",
    course: "Claude Code",
    text: "Me sorprendió todo lo que se puede automatizar con Claude Code. Aprender a crear skills, conectar herramientas y trabajar con subagentes me abrió un mundo de posibilidades para optimizar mi flujo de desarrollo.",
    avatar: Lucia,
  },
];

function Column({ items, reverse = false }: { items: Testimony[]; reverse?: boolean }) {
  const loop = [...items, ...items]; // duplicado para el loop infinito
  return (
    <div className="col">
      <div className={`col__track ${reverse ? "col__track--up" : ""}`}>
        {loop.map((item, people) => {
          const isClone = people >= items.length;
          return item.type === "image" ? (
            <img key={people} className="card card--img" src={item.src} alt={item.alt} aria-hidden={isClone} />
          ) : (
            <article key={people} className="card" aria-hidden={isClone}>
              <header className="card__header">
                <img className="card__avatar" src={item.avatar} alt="" />
                <div className="card__author">
                  <strong>{item.name}</strong>
                  <span>{item.course}</span>
                </div>
              </header>
              <p className="card__text">{item.text}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default function Community() {
  return (
    <section className="community">
      <h2 className="community__title">
        <span className="community__hash">#</span>RollingCommunity
      </h2>
      <div className="community__grid">
        <Column items={col1} />
        <Column items={col2} reverse />
        <Column items={col3} />
      </div>
    </section>
  );
}