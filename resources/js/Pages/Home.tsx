import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import HeroSection from '@/Components/Public/HeroSection';
import AboutSection from '@/Components/Public/AboutSection';
import ServicesSection from '@/Components/Public/ServicesSection';
import CoverageSection from '@/Components/Public/CoverageSection';
import ClientsSection from '@/Components/Public/ClientsSection';
import TestimonialsSection from '@/Components/Public/TestimonialsSection';
import GallerySection from '@/Components/Public/GallerySection';
import LegalSection from '@/Components/Public/LegalSection';
import ContactSection from '@/Components/Public/ContactSection';
import { Settings, StatItem, ServiceItem, CityItem, ClientItem, LegalDocItem, GalleryItem } from '@/types';
import { LanguageProvider, useLanguage } from '@/Contexts/LanguageContext';

interface TestimonialItem {
    id: number;
    name: string;
    company_or_position: string;
    type: 'corporate' | 'worker';
    testimonial: string;
    rating: number;
    avatar_url: string | null;
}

interface Props {
    settings: Settings;
    stats: StatItem[];
    services: ServiceItem[];
    cities: CityItem[];
    clientsActive: ClientItem[];
    clientsPast: ClientItem[];
    legal: LegalDocItem[];
    gallery: GalleryItem[];
    testimonials: TestimonialItem[];
    siteUrl: string;
}

export default function Home(props: Props) {
    return (
        <LanguageProvider>
            <HomeContent {...props} />
        </LanguageProvider>
    );
}

function HomeContent({ settings, stats, services, cities, clientsActive, clientsPast, legal, gallery, testimonials, siteUrl }: Props) {
    const { getLocalized } = useLanguage();
    const logoUrl = `${siteUrl}/images/logo/logo-original.png`;

    const metaTitle = getLocalized<string>('meta_title', settings) || 'Beranda';
    const metaDescription = getLocalized<string>('meta_description', settings) || '';

    const orgSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': settings.company_name || 'PT. Alfa Reka Usaha',
        'url': siteUrl,
        'logo': logoUrl,
        ...(settings.phone ? {
            'contactPoint': {
                '@type': 'ContactPoint',
                'telephone': settings.phone,
                'contactType': 'customer service'
            }
        } : {}),
        ...(settings.address ? {
            'address': {
                '@type': 'PostalAddress',
                'streetAddress': settings.address,
                'addressCountry': 'ID'
            }
        } : {}),
        ...(settings.email ? { 'email': settings.email } : {})
    };

    return (
        <PublicLayout settings={settings}>
            <Head title={metaTitle}>
                <meta name="description" content={metaDescription} />
                <link rel="canonical" href={siteUrl} />
                
                {/* Open Graph */}
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:url" content={siteUrl} />
                {settings.og_image && <meta property="og:image" content={settings.og_image} />}
                <meta property="og:type" content="website" />
                
                {/* Twitter / X */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDescription} />
                {settings.og_image && <meta name="twitter:image" content={settings.og_image} />}

                {/* JSON-LD Organization */}
                <script type="application/ld+json">
                    {JSON.stringify(orgSchema)}
                </script>
            </Head>

            <HeroSection settings={settings} stats={stats} />
            <div className="h-16 md:h-24 bg-surface" />
            <AboutSection settings={settings} />
            <ServicesSection services={services} />
            <CoverageSection cities={cities} />
            <ClientsSection activeClients={clientsActive} pastClients={clientsPast} />
            <TestimonialsSection testimonials={testimonials} />
            {gallery.length > 0 && <GallerySection items={gallery} />}
            <LegalSection documents={legal} />
            <ContactSection settings={settings} />
        </PublicLayout>
    );
}
