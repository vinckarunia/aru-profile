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
}

export default function Home({ settings, stats, services, cities, clientsActive, clientsPast, legal, gallery }: Props) {
    return (
        <PublicLayout settings={settings}>
            <Head title={settings.meta_title || 'Beranda'} />
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
