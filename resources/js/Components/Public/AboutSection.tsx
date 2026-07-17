import { Settings } from '@/types';
import { Stagger, StaggerItem } from '../Motion/Stagger';
import { useLanguage } from '@/Contexts/LanguageContext';

interface Props {
    settings: Settings;
}

export default function AboutSection({ settings }: Props) {
    const { t, lang, getLocalized } = useLanguage();

    const aboutHeadline = getLocalized<string>('about_headline', settings);
    const aboutBody1 = getLocalized<string>('about_body_1', settings);
    const aboutBody2 = getLocalized<string>('about_body_2', settings);
    const vision = getLocalized<string>('vision', settings);
    
    // Fallbacks for JSON arrays
    const missionRaw = getLocalized<any>('mission', settings);
    const mission = Array.isArray(missionRaw) ? missionRaw : [];

    const valuesRaw = getLocalized<any>('values', settings);
    const values = Array.isArray(valuesRaw) ? valuesRaw : [];

    const advantagesRaw = getLocalized<any>('competitive_advantages', settings);
    const advantages = Array.isArray(advantagesRaw) ? advantagesRaw : [];

    const leaderName = (settings.leader_name as string) || 'J. Hengky Wody';
    const leaderTitle = getLocalized<string>('leader_title', settings) || 'Direktur Utama';
    const leaderMessage = getLocalized<string>('leader_message', settings) || '';
    const leaderAvatar = settings.leader_avatar ? `/media/${settings.leader_avatar as string}` : null;
    const experienceText = getLocalized<string>('experience_text', settings) || '';

    // Map index to specific Material Icons for the 5 core values
    const valueIcons = [
        'verified_user', // Tanggung Jawab / Responsibility
        'hub',           // Sinergi / Synergy
        'volunteer_activism', // Membangun Kehidupan / Building Life
        'forum',         // Keterbukaan / Openness
        'handshake'      // Kepercayaan / Trust
    ];

    return (
        <section className="py-20 bg-surface" id="tentang">
            <div className="max-w-[1280px] mx-auto px-6 space-y-24">
                
                {/* 1. Profile: Core Info & Vision/Mission */}
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Left - Text */}
                    <Stagger staggerDelay={0.08} delay={0} className="space-y-6">
                        <StaggerItem>
                            <div className="inline-block bg-aru-biru-muda text-aru-merah px-3 py-1 rounded text-[13px] font-semibold tracking-[0.08em] uppercase">
                                {t('nav_about')}
                            </div>
                        </StaggerItem>
                        <StaggerItem>
                            <h2 className="font-heading font-bold text-[36px] md:text-[40px] leading-[1.25] text-aru-biru-tua">
                                {aboutHeadline}
                            </h2>
                        </StaggerItem>
                        <StaggerItem>
                            <p className="text-base leading-relaxed text-aru-abu">
                                {aboutBody1}
                            </p>
                        </StaggerItem>
                        {aboutBody2 && (
                            <StaggerItem>
                                <p className="text-base leading-relaxed text-aru-abu">
                                    {aboutBody2}
                                </p>
                            </StaggerItem>
                        )}
                    </Stagger>

                    {/* Right - Vision & Mission */}
                    <Stagger staggerDelay={0.08} delay={0.1} className="bg-aru-biru-muda/40 p-8 rounded-2xl border-l-4 border-aru-merah space-y-6 shadow-sm">
                        <StaggerItem>
                            <h3 className="font-heading font-bold text-[24px] text-aru-biru-tua flex items-center gap-2">
                                <span className="material-symbols-outlined text-aru-merah text-2xl">track_changes</span>
                                {t('vision')} &amp; {t('mission')}
                            </h3>
                        </StaggerItem>
                        <StaggerItem className="space-y-2">
                            <h4 className="font-heading font-bold text-sm tracking-[0.1em] uppercase text-aru-biru-tua/80">
                                {t('vision')}
                            </h4>
                            <p className="text-base leading-relaxed text-aru-abu font-medium">
                                {vision}
                            </p>
                        </StaggerItem>
                        {mission.length > 0 && (
                            <StaggerItem className="space-y-3">
                                <h4 className="font-heading font-bold text-sm tracking-[0.1em] uppercase text-aru-biru-tua/80">
                                    {t('mission')}
                                </h4>
                                <Stagger staggerDelay={0.06} useViewport={false} className="text-base leading-relaxed text-aru-abu space-y-3 list-none pl-0">
                                    {mission.map((item, i) => (
                                        <StaggerItem key={i} as="li" y={8} className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-aru-merah text-lg flex-shrink-0 mt-1">check_circle</span>
                                            <span className="inline text-sm md:text-base">{item}</span>
                                        </StaggerItem>
                                    ))}
                                </Stagger>
                            </StaggerItem>
                        )}
                    </Stagger>
                </div>

                {/* 2. Values (Nilai-Nilai) Grid */}
                {values.length > 0 && (
                    <div className="space-y-10">
                        <div className="text-center max-w-2xl mx-auto space-y-3">
                            <div className="inline-block bg-aru-merah/10 text-aru-merah px-3 py-1 rounded-full text-[11px] font-bold tracking-[0.08em] uppercase">
                                {t('values')}
                            </div>
                            <h3 className="font-heading font-bold text-[30px] text-aru-biru-tua">
                                {lang === 'id' ? 'Nilai-Nilai Utama Kami' : 'Our Core Values'}
                            </h3>
                            <p className="text-sm text-aru-abu leading-relaxed">
                                {lang === 'id' 
                                    ? 'Falsafah luhur yang menjadi landasan dan identitas dalam setiap operasional ketenagakerjaan kami.' 
                                    : 'Noble philosophies that serve as the foundation and identity of our workforce operations.'}
                            </p>
                        </div>

                        <Stagger staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                            {values.map((item, i) => (
                                <StaggerItem 
                                    key={i} 
                                    className="bg-white p-6 rounded-xl border border-surface-container-high hover:border-aru-merah/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-aru-biru-muda flex items-center justify-center text-aru-biru-tua group-hover:bg-aru-merah group-hover:text-white transition-all duration-300 mb-4">
                                        <span className="material-symbols-outlined text-2xl">{valueIcons[i] || 'stars'}</span>
                                    </div>
                                    <h4 className="font-heading font-bold text-base text-aru-biru-tua mb-2 group-hover:text-aru-merah transition-all duration-200">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs text-aru-abu leading-relaxed">
                                        {item.description}
                                    </p>
                                </StaggerItem>
                            ))}
                        </Stagger>
                    </div>
                )}

                {/* 3. Leadership & Experience (Pemimpin dan Pengalaman Kami) */}
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* Left 5 cols - Leader Message Quote Card */}
                    <div className="lg:col-span-5">
                        <div className="bg-gradient-to-br from-aru-biru-tua to-aru-biru-tua/95 text-aru-putih p-8 rounded-2xl shadow-xl relative overflow-hidden">
                            <span className="absolute -top-6 -right-6 text-white/5 text-[180px] font-serif select-none pointer-events-none">“</span>
                            
                            <div className="space-y-6 relative z-10">
                                <div className="inline-block bg-aru-merah text-aru-putih px-3 py-1 rounded text-[11px] font-bold tracking-[0.08em] uppercase">
                                    {lang === 'id' ? 'Salam Manajemen' : 'Management Message'}
                                </div>

                                <p className="text-sm md:text-base leading-relaxed italic text-white/90 font-medium">
                                    &ldquo;{leaderMessage}&rdquo;
                                </p>

                                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                                    {leaderAvatar ? (
                                        <img 
                                            src={leaderAvatar} 
                                            alt={leaderName} 
                                            className="w-12 h-12 rounded-full object-cover border-2 border-aru-merah" 
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-aru-merah text-aru-putih flex items-center justify-center font-bold text-lg">
                                            {leaderName.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-bold text-base text-white">{leaderName}</h4>
                                        <p className="text-xs text-white/60 font-semibold">{leaderTitle}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right 7 cols - Experience Text & Advantages */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="space-y-4">
                            <div className="inline-block bg-aru-biru-muda text-aru-biru-tua px-3 py-1 rounded text-[13px] font-semibold tracking-[0.08em] uppercase">
                                {t('leadership')}
                            </div>
                            <h3 className="font-heading font-bold text-[28px] md:text-[32px] text-aru-biru-tua leading-tight">
                                {lang === 'id' ? 'Pengalaman Panjang Ketenagakerjaan' : 'Decades of HR Experience'}
                            </h3>
                            <p className="text-base leading-relaxed text-aru-abu">
                                {experienceText}
                            </p>
                        </div>

                        {advantages.length > 0 && (
                            <div className="space-y-4">
                                <h4 className="font-heading font-bold text-sm tracking-[0.1em] uppercase text-aru-biru-tua">
                                    {t('advantages')}
                                </h4>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {advantages.map((adv, idx) => (
                                        <div 
                                            key={idx} 
                                            className="flex items-center gap-3 p-3 bg-white border border-surface-container-high rounded-xl hover:shadow-sm transition-all"
                                        >
                                            <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                                                <span className="material-symbols-outlined text-sm font-bold">check</span>
                                            </span>
                                            <span className="text-sm font-semibold text-aru-biru-tua">{adv}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
}
