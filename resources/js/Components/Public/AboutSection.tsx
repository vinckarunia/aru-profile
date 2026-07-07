import { Settings } from '@/types';
import { Stagger, StaggerItem } from '../Motion/Stagger';

interface Props {
    settings: Settings;
}

export default function AboutSection({ settings }: Props) {
    const mission = Array.isArray(settings.mission) ? settings.mission : [];

    return (
        <section className="py-20 max-w-[1280px] mx-auto px-6" id="tentang">
            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Left - Text */}
                <Stagger staggerDelay={0.08} delay={0} className="space-y-4">
                    <StaggerItem>
                        <div className="inline-block bg-aru-biru-muda text-aru-merah px-3 py-1 rounded text-[13px] font-semibold tracking-[0.08em] uppercase">
                            TENTANG KAMI
                        </div>
                    </StaggerItem>
                    <StaggerItem>
                        <h2 className="font-heading font-bold text-[40px] leading-[1.3] text-aru-biru-tua">
                            {settings.about_headline}
                        </h2>
                    </StaggerItem>
                    <StaggerItem>
                        <p className="text-base leading-relaxed text-aru-abu">
                            {settings.about_body_1}
                        </p>
                    </StaggerItem>
                    {settings.about_body_2 && (
                        <StaggerItem>
                            <p className="text-base leading-relaxed text-aru-abu">
                                {settings.about_body_2}
                            </p>
                        </StaggerItem>
                    )}
                </Stagger>

                {/* Right - Vision & Mission */}
                <Stagger staggerDelay={0.08} delay={0.1} className="bg-aru-biru-muda p-8 rounded-xl border-l-4 border-aru-merah space-y-4">
                    <StaggerItem>
                        <h3 className="font-heading font-bold text-[22px] text-aru-biru-tua">
                            Visi &amp; Misi
                        </h3>
                    </StaggerItem>
                    <StaggerItem>
                        <div>
                            <h4 className="font-heading font-bold text-lg tracking-[0.1em] uppercase text-aru-biru-tua mb-2">
                                Visi
                            </h4>
                            <p className="text-base leading-relaxed text-aru-abu">
                                {settings.vision}
                            </p>
                        </div>
                    </StaggerItem>
                    {mission.length > 0 && (
                        <StaggerItem>
                            <div>
                                <h4 className="font-heading font-bold text-lg tracking-[0.1em] uppercase text-aru-biru-tua mb-2">
                                    Misi
                                </h4>
                                <Stagger staggerDelay={0.06} useViewport={false} className="text-base leading-relaxed text-aru-abu space-y-2 list-disc list-inside">
                                    {mission.map((item, i) => (
                                        <StaggerItem key={i} as="li" y={8}>
                                            <span className="inline">{item}</span>
                                        </StaggerItem>
                                    ))}
                                </Stagger>
                            </div>
                        </StaggerItem>
                    )}
                </Stagger>
            </div>
        </section>
    );
}
