import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import HeroSection from '@/Components/Public/HeroSection';
import AboutSection from '@/Components/Public/AboutSection';
import ServicesSection from '@/Components/Public/ServicesSection';
import CoverageSection from '@/Components/Public/CoverageSection';
import ClientsSection from '@/Components/Public/ClientsSection';
import GallerySection from '@/Components/Public/GallerySection';
import LegalSection from '@/Components/Public/LegalSection';
import ContactSection from '@/Components/Public/ContactSection';
import { Settings, StatItem, ServiceItem, CityItem, ClientItem, LegalDocItem, GalleryItem } from '@/types';

interface Props {
    settings: Settings;
    stats: StatItem[];
    services: ServiceItem[];
    cities: CityItem[];
    clientsActive: ClientItem[];
    clientsPast: ClientItem[];
    legal: LegalDocItem[];
    gallery: GalleryItem[];
    siteUrl: string;
}

export default function Home({ settings, stats, services, cities, clientsActive, clientsPast, legal, gallery, siteUrl }: Props) {
    const logoUrl = `${siteUrl}/images/logo/logo-original.png`;

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
            <Head title={settings.meta_title || 'Beranda'}>
                <meta name="description" content={settings.meta_description || ''} />
                <link rel="canonical" href={siteUrl} />
                
                {/* Open Graph */}
                <meta property="og:title" content={settings.meta_title || 'PT. Alfa Reka Usaha'} />
                <meta property="og:description" content={settings.meta_description || ''} />
                <meta property="og:url" content={siteUrl} />
                {settings.og_image && <meta property="og:image" content={settings.og_image} />}
                <meta property="og:type" content="website" />
                
                {/* Twitter / X */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={settings.meta_title || 'PT. Alfa Reka Usaha'} />
                <meta name="twitter:description" content={settings.meta_description || ''} />
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
            {gallery.length > 0 && <GallerySection items={gallery} />}
            <LegalSection documents={legal} />
            <ContactSection settings={settings} />
        </PublicLayout>
    );
}
