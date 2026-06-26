import { Settings, StatItem } from '@/types';

interface Props {
    settings: Settings;
    stats: StatItem[];
}

export default function HeroSection({ settings, stats }: Props) {
    return (
        <section
            className="relative min-h-[600px] lg:min-h-[921px] flex items-center clip-diagonal bg-aru-biru-tua text-aru-putih"
            id="hero"
        >
            {/* Background Image */}
            {settings.hero_background && (
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-aru-biru-tua via-aru-biru-tua/90 to-aru-biru-tua/70 z-10" />
                    <img
                        src={settings.hero_background}
                        alt="Hero background"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* If no background, still apply overlay */}
            {!settings.hero_background && (
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-aru-biru-tua to-[#0f1d33]" />
            )}

            <div className="relative z-20 max-w-[1280px] mx-auto px-6 w-full pb-20">
                <div className="max-w-3xl">
                    <h1 className="font-heading font-extrabold text-[40px] md:text-[72px] leading-[1.1] md:leading-[1.1] tracking-[-0.02em] mb-4">
                        {settings.hero_headline}
                    </h1>
                    <p className="text-lg leading-relaxed text-aru-putih/90 mb-8 max-w-2xl">
                        {settings.hero_subtext}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        {settings.cta_primary_label && (
                            <a
                                href={settings.cta_primary_url || '#'}
                                className="inline-flex items-center justify-center bg-aru-merah text-aru-putih px-6 py-3 rounded text-[13px] font-semibold tracking-[0.08em] uppercase hover:scale-[1.03] transition-all"
                            >
                                {settings.cta_primary_label}
                            </a>
                        )}
                        {settings.cta_secondary_label && (
                            <a
                                href={settings.cta_secondary_url || '#'}
                                className="inline-flex items-center justify-center border border-aru-putih text-aru-putih px-6 py-3 rounded text-[13px] font-semibold tracking-[0.08em] uppercase hover:bg-aru-putih hover:text-aru-biru-tua transition-all"
                            >
                                {settings.cta_secondary_label}
                            </a>
                        )}
                    </div>

                    {/* Stats */}
                    {stats.length > 0 && (
                        <div className="grid grid-cols-3 gap-6 pt-4 border-t border-aru-putih/20">
                            {stats.map((stat) => (
                                <div key={stat.id}>
                                    <div className="font-heading font-semibold text-[22px] leading-snug text-aru-emas">
                                        {stat.value}
                                    </div>
                                    <div className="text-[13px] font-semibold tracking-[0.08em] uppercase text-aru-putih/80 mt-1">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
