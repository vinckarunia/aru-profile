import { ServiceItem } from '@/types';
import { motion, useReducedMotion, Variants } from 'motion/react';
import { Stagger } from '../Motion/Stagger';
import { useLanguage } from '@/Contexts/LanguageContext';

interface Props {
    services: ServiceItem[];
}

export default function ServicesSection({ services }: Props) {
    const { t, getLocalized } = useLanguage();
    const shouldReduceMotion = useReducedMotion();

    const cardVariants: Variants = {
        hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: shouldReduceMotion ? 0 : 0.45,
                ease: 'easeOut' as const,
            },
        },
        hover: shouldReduceMotion ? {} : {
            y: -5,
            transition: {
                duration: 0.2,
                ease: 'easeOut' as const,
            },
        },
    };

    const iconVariants: Variants = {
        hover: shouldReduceMotion ? {} : { scale: 1.06 },
    };

    return (
        <section className="py-20 bg-aru-biru-muda/30" id="layanan">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="text-center mb-12 space-y-3 max-w-2xl mx-auto">
                    <div className="inline-block bg-white text-aru-merah px-3 py-1 rounded text-[13px] font-semibold tracking-[0.08em] uppercase shadow-sm">
                        {t('nav_services')}
                    </div>
                    <h2 className="font-heading font-bold text-[36px] md:text-[40px] leading-[1.3] text-aru-biru-tua">
                        {t('services_title')}
                    </h2>
                    <p className="text-sm md:text-base text-aru-abu leading-relaxed">
                        {t('services_subtitle')}
                    </p>
                </div>

                <Stagger
                    staggerDelay={0.08}
                    viewportAmount={0.18}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={cardVariants}
                            whileHover={shouldReduceMotion ? {} : 'hover'}
                            className="bg-aru-biru-tua rounded-2xl p-6 group transition-shadow duration-300 hover:shadow-xl cursor-default"
                        >
                            {service.icon && (
                                <motion.span
                                    variants={iconVariants}
                                    aria-hidden="true"
                                    className="material-symbols-outlined text-aru-merah text-4xl mb-4 block origin-left"
                                >
                                    {service.icon}
                                </motion.span>
                            )}
                            <h3 className="font-heading font-semibold text-[22px] leading-snug text-aru-putih mb-3">
                                {getLocalized('title', service)}
                            </h3>
                            <p className="text-base leading-relaxed text-aru-putih/70">
                                {getLocalized('description', service)}
                            </p>
                        </motion.div>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
