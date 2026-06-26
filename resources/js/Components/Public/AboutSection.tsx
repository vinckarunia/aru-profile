import { Settings } from '@/types';

interface Props {
    settings: Settings;
}

export default function AboutSection({ settings }: Props) {
    const mission = Array.isArray(settings.mission) ? settings.mission : [];

    return (
        <section className="py-20 max-w-[1280px] mx-auto px-6" id="tentang">
            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Left - Text */}
                <div>
                    <div className="inline-block bg-aru-biru-muda text-aru-merah px-3 py-1 rounded text-[13px] font-semibold tracking-[0.08em] uppercase mb-4">
                        TENTANG KAMI
                    </div>
                    <h2 className="font-heading font-bold text-[40px] leading-[1.3] text-aru-biru-tua mb-4">
                        {settings.about_headline}
                    </h2>
                    <p className="text-base leading-relaxed text-aru-abu mb-4">
                        {settings.about_body_1}
                    </p>
                    <p className="text-base leading-relaxed text-aru-abu">
                        {settings.about_body_2}
                    </p>
                </div>

                {/* Right - Vision & Mission */}
                <div className="bg-aru-biru-muda p-8 rounded-xl border-l-4 border-aru-merah">
                    <h3 className="font-heading font-bold text-[22px] text-aru-biru-tua mb-4">
                        Visi &amp; Misi
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-heading font-bold text-lg tracking-[0.1em] uppercase text-aru-biru-tua mb-2">
                                Visi
                            </h4>
                            <p className="text-base leading-relaxed text-aru-abu">
                                {settings.vision}
                            </p>
                        </div>
                        {mission.length > 0 && (
                            <div>
                                <h4 className="font-heading font-bold text-lg tracking-[0.1em] uppercase text-aru-biru-tua mb-2">
                                    Misi
                                </h4>
                                <ul className="text-base leading-relaxed text-aru-abu space-y-2 list-disc list-inside">
                                    {mission.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
