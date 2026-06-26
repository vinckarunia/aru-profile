import { ServiceItem } from '@/types';

interface Props {
    services: ServiceItem[];
}

export default function ServicesSection({ services }: Props) {
    return (
        <section className="py-20 bg-aru-biru-muda" id="layanan">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="text-center mb-12">
                    <div className="inline-block bg-aru-putih text-aru-biru-tua px-3 py-1 rounded text-[13px] font-semibold tracking-[0.08em] uppercase mb-4">
                        LAYANAN
                    </div>
                    <h2 className="font-heading font-bold text-[40px] leading-[1.3] text-aru-biru-tua">
                        Layanan yang Kami Sediakan
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-aru-biru-tua rounded p-6 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl cursor-default"
                        >
                            {service.icon && (
                                <span className="material-symbols-outlined text-aru-emas text-4xl mb-4 block">
                                    {service.icon}
                                </span>
                            )}
                            <h3 className="font-heading font-semibold text-[22px] leading-snug text-aru-putih mb-3">
                                {service.title}
                            </h3>
                            <p className="text-base leading-relaxed text-aru-putih/70">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
