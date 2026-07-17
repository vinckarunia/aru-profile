import { Settings, StatItem } from '@/types';
import { motion, useReducedMotion } from 'motion/react';
import AnimatedNumber from '../Motion/AnimatedNumber';
import FadeUp from '../Motion/FadeUp';
import { useLanguage } from '@/Contexts/LanguageContext';

interface Props {
    settings: Settings;
    stats: StatItem[];
}

export default function HeroSection({ settings, stats }: Props) {
    const { getLocalized } = useLanguage();
    const shouldReduceMotion = useReducedMotion();

    const tagline = getLocalized<string>('tagline', settings);
    const heroHeadline = getLocalized<string>('hero_headline', settings);
    const heroSubtext = getLocalized<string>('hero_subtext', settings);
    const ctaPrimaryLabel = getLocalized<string>('cta_primary_label', settings);
    const ctaSecondaryLabel = getLocalized<string>('cta_secondary_label', settings);

    return (
        <section
            className="relative min-h-[600px] lg:min-h-[921px] flex items-center clip-diagonal bg-aru-biru-tua text-aru-putih"
            id="hero"
        >
            {/* Background Image */}
            {settings.hero_background && (
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-aru-biru-tua/90 via-aru-biru-tua/45 to-transparent z-10" />
                    <motion.img
                        src={settings.hero_background}
                        alt=""
                        fetchPriority="high"
                        className="w-full h-full object-cover"
                        initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.04 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.4, ease: 'easeOut' }}
                    />
                </div>
            )}

            {/* If no background, still apply overlay */}
            {!settings.hero_background && (
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-aru-biru-tua to-[#0f1d33]" />
            )}

            <div className="relative z-20 max-w-[1280px] mx-auto px-6 w-full pb-20">
                <div className="max-w-3xl">
                    {/* Eyebrow / Tagline */}
                    {tagline && (
                        <FadeUp delay={0.08} y={16}>
                            <div className="inline-block bg-aru-biru-tua/20 text-aru-emas px-3 py-1 rounded text-[13px] font-semibold tracking-[0.08em] uppercase mb-4">
                                {tagline}
                            </div>
                        </FadeUp>
                    )}

                    {/* Headline */}
                    <FadeUp delay={0.18} y={24}>
                            <h1 className="font-heading font-extrabold text-[#fff3da] text-[40px] md:text-[72px] leading-[1.1] md:leading-[1.1] tracking-[-0.02em] mb-4">
                            {heroHeadline}
                        </h1>
                    </FadeUp>

                    {/* Subtext */}
                    <FadeUp delay={0.28} y={20}>
                        <p className="text-lg leading-relaxed text-[#fff3da] mb-8 max-w-2xl">
                            {heroSubtext}
                        </p>
                    </FadeUp>

                    {/* CTAs */}
                    <FadeUp delay={0.38} y={16}>
                        <div className="flex flex-wrap gap-4 mb-8">
                            {ctaPrimaryLabel && (
                                <motion.a
                                    href={settings.cta_primary_url || '#'}
                                    whileHover={shouldReduceMotion ? {} : { y: -2 }}
                                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                                    className="inline-flex items-center justify-center bg-aru-merah text-aru-putih px-6 py-3 rounded text-[13px] font-semibold tracking-[0.08em] uppercase transition-colors"
                                >
                                    {ctaPrimaryLabel}
                                </motion.a>
                            )}
                            {ctaSecondaryLabel && (
                                <motion.a
                                    href={settings.cta_secondary_url || '#'}
                                    whileHover={shouldReduceMotion ? {} : { y: -2 }}
                                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                                    className="inline-flex items-center justify-center border border-aru-putih text-aru-putih px-6 py-3 rounded text-[13px] font-semibold tracking-[0.08em] uppercase hover:bg-aru-putih hover:text-aru-biru-tua transition-colors"
                                >
                                    {ctaSecondaryLabel}
                                </motion.a>
                            )}
                        </div>
                    </FadeUp>

                    {/* Stats */}
                    {stats.length > 0 && (
                        <FadeUp delay={0.48} y={16}>
                            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-aru-putih/20">
                                {stats.map((stat) => (
                                    <div key={stat.id} className="bg-aru-biru-tua/65 p-4 rounded-lg">
                                        <div className="font-heading font-semibold text-[22px] leading-snug text-aru-emas">
                                            <AnimatedNumber value={stat.value} />
                                        </div>
                                        <div className="text-[13px] font-semibold tracking-[0.08em] uppercase text-aru-putih/80 mt-1">
                                            {getLocalized('label', stat)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FadeUp>
                    )}
                </div>
            </div>
        </section>
    );
}
