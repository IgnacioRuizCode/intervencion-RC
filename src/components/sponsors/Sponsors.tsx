import './Sponsors.css'
import {ArrowUpRight, Award, CreditCard, Crown, Cpu, Layers, Server} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import GoogleCloud from '../../assets/speakers-logos/sponsors-GoogleCloud.webp'
import AmazonWebServices from '../../assets/speakers-logos/sponsors-Amazon.webp'
import MercadoLibre from '../../assets/speakers-logos/sponsors-MeLi.webp'
import Microsoft from '../../assets/speakers-logos/sponsors-Microsoft.webp'
import Github from '../../assets/speakers-logos/sponsors-Github.webp'
import Globant from '../../assets/speakers-logos/sponsors-Globant.webp'
import Auth0 from '../../assets/speakers-logos/sponsors-Auth0.webp'
import Vercel from '../../assets/speakers-logos/sponsors-Versel.webp'
import Supabase from '../../assets/speakers-logos/sponsors-Supabase.webp'
import DigitalOcean from '../../assets/speakers-logos/sponsors-DigitalOcean.webp'
import Cloudflare from '../../assets/speakers-logos/sponsors-Cloudflare.webp'
import MongoDB from '../../assets/speakers-logos/sponsors-MongoDB.webp'
import Docker from '../../assets/speakers-logos/sponsors-Docker.webp'
import Stripe from '../../assets/speakers-logos/sponsors-Stripe.webp'
import Postman from '../../assets/speakers-logos/sponsors-Postman.webp'


type MainPartner = {
    name: string
    badge: string
    logo: string
    description: string
    categoryIcon: LucideIcon
    category: string
    highlight: string
    featured?: boolean
}

type SimplePartner = {
    name: string
    role: string
    logo: string
    tag?: string
}

const mainPartners: MainPartner[] = [
    {
        name: 'Google Cloud',
        badge: 'LEAD CLOUD PARTNER',
        logo: GoogleCloud,
        description:
            'Infraestructura global ultra-escalable, Gemini AI APIs y programas de formación profesional para devs.',
        categoryIcon: Cpu,
        category: 'Cloud & AI',
        highlight: '100% Verified',
    },
    {
        name: 'Amazon Web Services',
        badge: 'INFRASTRUCTURE PARTNER',
        logo: AmazonWebServices,
        description:
            'Servicios de nube, arquitecturas serverless y vouchers para certificaciones oficiales para la comunidad.',
        categoryIcon: Server,
        category: 'Cloud Hosting',
        highlight: 'Global Leader',
    },
    {
        name: 'Mercado Libre',
        badge: 'FINTECH & E-COMMERCE',
        logo: MercadoLibre,
        description:
            'El mayor ecosistema tech de Latinoamérica impulsando becas, hackathons y pasantías directas de empleo.',
        categoryIcon: CreditCard,
        category: 'Fintech Scale',
        highlight: 'Unicorn LATAM',
        featured: true,
    },
]

const goldPartners: SimplePartner[] = [
    { name: 'Microsoft', role: 'Azure & Dev Tools', logo: Microsoft, tag: 'Enterprise' },
    { name: 'GitHub', role: 'Open Source & Copilot', logo: Github, tag: 'Community' },
    { name: 'Globant', role: 'Tech Reinvention', logo: Globant, tag: 'Global Talent' },
    { name: 'Auth0', role: 'Identity & Security', logo: Auth0, tag: 'Security' },
    { name: 'Vercel', role: 'Frontend Cloud & Next', logo: Vercel, tag: 'Deployment' },
]

const bronzePartners: SimplePartner[] = [
    { name: 'Supabase', role: 'Open-source DB', logo: Supabase },
    { name: 'DigitalOcean', role: 'Cloud VPS', logo: DigitalOcean },
    { name: 'Cloudflare', role: 'Edge & DNS', logo: Cloudflare },
    { name: 'MongoDB', role: 'Document DB', logo: MongoDB },
    { name: 'Docker', role: 'Containers', logo: Docker },
    { name: 'Stripe', role: 'Payments API', logo: Stripe },
    { name: 'Postman', role: 'API Platform', logo: Postman },
]

function Sponsors() {
    return (
        <section className='sponsors'>
            
            <div className='tier tier--diamond'>
                <header className='tierHeader'>
                    <div className='tierIcon'>
                        <Crown size={20} />
                    </div>
                    <div className='tierHeaderText'>
                        <div className='tierTitleRow'>
                            <h2 className='tierTitle'>MAIN PARTNERS</h2>
                            <span className='tierBadge'>TIER DIAMANTE</span>
                        </div>
                        <p className='tierSubtitle'>
                            Presencia estelar en conferencias, stands experienciales y becas formativas.
                        </p>
                    </div>
                </header>

                <div className='mainPartnersCards'>
                    {mainPartners.map((partner) => {
                        const CategoryIcon = partner.categoryIcon
                        return (
                            <article
                                key={partner.name}
                                className={`mainCard ${partner.featured ? 'mainCard--featured' : ''}`}
                            >
                                <div className='mainCardTop'>
                                    <span className='mainCardBadge'>{partner.badge}</span>
                                    <a
                                        href='#'
                                        className='mainCardLink'
                                        aria-label={`Ver más sobre ${partner.name}`}
                                    >
                                        <ArrowUpRight size={16} />
                                    </a>
                                </div>

                                <div className='mainCardBody'>
                                    <div className='logoBox logoBox--large'>
                                        <img src={partner.logo} alt={`Logo de ${partner.name}`} />
                                    </div>
                                    <h3 className='mainCardName'>{partner.name}</h3>
                                    <p className='mainCardDescription'>{partner.description}</p>
                                </div>

                                <div className='mainCardFooter'>
                                    <p className='mainCardCategory'>
                                        <CategoryIcon size={16} />
                                        {partner.category}
                                    </p>
                                    <p className='mainCardHighlight'>{partner.highlight}</p>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </div>

            <div className='tier tier--gold'>
                <header className='tierHeader'>
                    <div className='tierIcon'>
                        <Award size={20} />
                    </div>
                    <div className='tierHeaderText'>
                        <div className='tierTitleRow'>
                            <h2 className='tierTitle'>GOLD TIER</h2>
                            <span className='tierBadge'>NIVEL ORO</span>
                        </div>
                        <p className='tierSubtitle'>
                            Líderes de producto, frameworks y transformación digital global.
                        </p>
                    </div>
                </header>

                <div className='goldCards'>
                    {goldPartners.map((partner) => (
                        <article key={partner.name} className='goldCard'>
                            <div className='logoBox logoBox--medium'>
                                <img src={partner.logo} alt={`Logo de ${partner.name}`} />
                            </div>
                            <h3 className='goldCardName'>{partner.name}</h3>
                            <p className='goldCardRole'>{partner.role}</p>
                            {partner.tag && <span className='goldCardTag'>{partner.tag}</span>}
                        </article>
                    ))}
                </div>
            </div>

            <div className='tier tier--bronze'>
                <header className='tierHeader'>
                    <div className='tierIcon'>
                        <Layers size={20} />
                    </div>
                    <div className='tierHeaderText'>
                        <div className='tierTitleRow'>
                            <h2 className='tierTitle'>BRONZE TIER</h2>
                            <span className='tierBadge'>NIVEL BRONCE</span>
                        </div>
                        <p className='tierSubtitle'>
                            Herramientas y plataformas predilectas de la comunidad de desarrolladores.
                        </p>
                    </div>
                </header>

                <div className='bronzeCards'>
                    {bronzePartners.map((partner) => (
                        <article key={partner.name} className='bronzeCard'>
                            <div className='logoBox logoBox--small'>
                                <img src={partner.logo} alt={`Logo de ${partner.name}`} />
                            </div>
                            <h3 className='bronzeCardName'>{partner.name}</h3>
                            <p className='bronzeCardRole'>{partner.role}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Sponsors