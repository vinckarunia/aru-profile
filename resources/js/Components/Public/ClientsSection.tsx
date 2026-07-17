import { ClientItem } from '@/types';
import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'motion/react';
import { Stagger, StaggerItem } from '../Motion/Stagger';
import { useLanguage } from '@/Contexts/LanguageContext';

interface Props {
    activeClients: ClientItem[];
    pastClients: ClientItem[];
}

export default function ClientsSection({ activeClients, pastClients }: Props) {
    const { t, lang } = useLanguage();
    const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');
    const [isFirstEntrance, setIsFirstEntrance] = useState(true);
    const shouldReduceMotion = useReducedMotion();

    const handleTabChange = (tab: 'active' | 'past') => {
        setIsFirstEntrance(false);
        setActiveTab(tab);
    };

    const displayedClients = activeTab === 'active' ? activeClients : pastClients;

    const tabContentVariants: Variants = {
        initial: { opacity: 0, y: 8 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.22, ease: 'easeOut' as const },
        },
        exit: {
            opacity: 0,
            y: -8,
            transition: { duration: 0.2, ease: 'easeIn' as const },
        },
    };

    return (
        <section className="py-20 bg-aru-biru-muda/30" id="klien">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="text-center mb-8 space-y-3 max-w-2xl mx-auto">
                    <div className="inline-block bg-white text-aru-merah px-3 py-1 rounded text-[13px] font-semibold tracking-[0.08em] uppercase shadow-sm">
                        {t('clients_title')}
                    </div>
                    <h2 className="font-heading font-bold text-[36px] md:text-[40px] leading-[1.3] text-aru-biru-tua">
                        {lang === 'id' ? 'Dipercaya oleh Perusahaan Terkemuka' : 'Trusted by Leading Companies'}
                    </h2>
                    <p className="text-sm md:text-base text-aru-abu leading-relaxed">
                        {t('clients_subtitle')}
                    </p>
                </div>

                {/* Tab Switcher */}
                <div data-nosnippet className="flex justify-center gap-4 mb-10">
                    <button
                        type="button"
                        onClick={() => handleTabChange('active')}
                        className={`relative px-6 py-2 rounded-full font-semibold text-sm transition-colors duration-300 cursor-pointer z-10 border ${
                            activeTab === 'active'
                                ? 'text-aru-putih border-transparent'
                                : 'bg-aru-putih text-aru-abu border-surface-container-high hover:text-aru-biru-tua hover:bg-white/80'
                        }`}
                    >
                        {activeTab === 'active' && !shouldReduceMotion && (
                            <motion.div
                                layoutId="client-tab-indicator"
                                className="absolute inset-0 bg-aru-merah rounded-full -z-10 shadow-md"
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                        )}
                        {activeTab === 'active' && shouldReduceMotion && (
                            <div className="absolute inset-0 bg-aru-merah rounded-full -z-10 shadow-md" />
                        )}
                        {t('clients_active')}
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTabChange('past')}
                        className={`relative px-6 py-2 rounded-full font-semibold text-sm transition-colors duration-300 cursor-pointer z-10 border ${
                            activeTab === 'past'
                                ? 'text-aru-putih border-transparent'
                                : 'bg-aru-putih text-aru-abu border-surface-container-high hover:text-aru-biru-tua hover:bg-white/80'
                        }`}
                    >
                        {activeTab === 'past' && !shouldReduceMotion && (
                            <motion.div
                                layoutId="client-tab-indicator"
                                className="absolute inset-0 bg-aru-merah rounded-full -z-10 shadow-md"
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                        )}
                        {activeTab === 'past' && shouldReduceMotion && (
                            <div className="absolute inset-0 bg-aru-merah rounded-full -z-10 shadow-md" />
                        )}
                        {t('clients_past')}
                    </button>
                </div>

                <div className="min-h-[220px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            variants={tabContentVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            {displayedClients.length === 0 ? (
                                <div className="text-center py-16 bg-aru-putih/50 rounded-2xl border border-dashed border-aru-abu/20 max-w-md mx-auto">
                                    <span className="material-symbols-outlined text-aru-abu/30 text-5xl mb-3 block" aria-hidden="true">
                                        business
                                    </span>
                                    <p className="text-aru-abu text-sm font-medium">
                                        {lang === 'id' ? 'Belum ada data klien untuk kategori ini.' : 'No client data available for this category.'}
                                    </p>
                                </div>
                            ) : isFirstEntrance ? (
                                <Stagger
                                    staggerDelay={0.05}
                                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
                                >
                                    {displayedClients.map((client) => {
                                        const CardContent = (
                                            <div className="relative flex flex-col items-center justify-center w-full h-full">
                                                {client.logo_url ? (
                                                    <>
                                                        <img
                                                            src={client.logo_url}
                                                            alt={`Logo ${client.name}`}
                                                            loading="lazy"
                                                            width="120"
                                                            height="64"
                                                            className="max-h-12 max-w-full w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:-translate-y-2.5 transition-all duration-300"
                                                        />
                                                        <span className="absolute bottom-[-22px] text-[9px] font-black text-aru-merah opacity-0 group-hover:opacity-100 group-hover:bottom-[-10px] transition-all duration-300 text-center uppercase tracking-wider truncate max-w-full px-1">
                                                            {client.name}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <div className="text-center">
                                                        <span className="material-symbols-outlined text-aru-abu/40 text-3xl mb-1 block group-hover:text-aru-merah transition-colors" aria-hidden="true">
                                                            business
                                                        </span>
                                                        <span className="text-[11px] font-semibold text-aru-abu/60 leading-tight block">
                                                            {client.name}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        );

                                        const className =
                                            'bg-aru-putih rounded-xl p-6 flex items-center justify-center min-h-[100px] group hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-surface-container-high/40';

                                        return client.website_url ? (
                                            <StaggerItem
                                                key={client.id}
                                                as="a"
                                                className={className}
                                                href={client.website_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title={`${client.name} (Kunjungi website)`}
                                            >
                                                {CardContent}
                                            </StaggerItem>
                                        ) : (
                                            <StaggerItem
                                                key={client.id}
                                                as="div"
                                                className={className}
                                                title={client.name}
                                            >
                                                {CardContent}
                                            </StaggerItem>
                                        );
                                    })}
                                </Stagger>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                    {displayedClients.map((client) => {
                                        const CardContent = (
                                            <div className="relative flex flex-col items-center justify-center w-full h-full">
                                                {client.logo_url ? (
                                                    <>
                                                        <img
                                                            src={client.logo_url}
                                                            alt={`Logo ${client.name}`}
                                                            loading="lazy"
                                                            width="120"
                                                            height="64"
                                                            className="max-h-12 max-w-full w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:-translate-y-2.5 transition-all duration-300"
                                                        />
                                                        <span className="absolute bottom-[-22px] text-[9px] font-black text-aru-merah opacity-0 group-hover:opacity-100 group-hover:bottom-[-10px] transition-all duration-300 text-center uppercase tracking-wider truncate max-w-full px-1">
                                                            {client.name}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <div className="text-center">
                                                        <span className="material-symbols-outlined text-aru-abu/40 text-3xl mb-1 block group-hover:text-aru-merah transition-colors" aria-hidden="true">
                                                            business
                                                        </span>
                                                        <span className="text-[11px] font-semibold text-aru-abu/60 leading-tight block">
                                                            {client.name}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        );

                                        const className =
                                            'bg-aru-putih rounded-xl p-6 flex items-center justify-center min-h-[100px] group hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-surface-container-high/40';

                                        return client.website_url ? (
                                            <a
                                                key={client.id}
                                                href={client.website_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={className}
                                                title={`${client.name} (Kunjungi website)`}
                                            >
                                                {CardContent}
                                            </a>
                                        ) : (
                                            <div
                                                key={client.id}
                                                className={className}
                                                title={client.name}
                                            >
                                                {CardContent}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
