import { CityItem } from '@/types';
import { Stagger, StaggerItem } from '../Motion/Stagger';

interface Props {
    cities: CityItem[];
}

export default function CoverageSection({ cities }: Props) {
    // Group cities by province
    const grouped = cities.reduce<Record<string, CityItem[]>>((acc, city) => {
        const province = city.province || 'Lainnya';
        if (!acc[province]) acc[province] = [];
        acc[province].push(city);
        return acc;
    }, {});

    return (
        <section className="py-20 max-w-[1280px] mx-auto px-6" id="jangkauan">
            <div className="text-center mb-12">
                <div className="inline-block bg-aru-biru-muda text-aru-merah px-3 py-1 rounded text-[13px] font-semibold tracking-[0.08em] uppercase mb-4">
                    JANGKAUAN LAYANAN
                </div>
                <h2 className="font-heading font-bold text-[40px] leading-[1.3] text-aru-biru-tua">
                    Area Layanan Kami
                </h2>
                <p className="text-base text-aru-abu mt-2 max-w-2xl mx-auto">
                    Kami hadir di {cities.length} kota di seluruh Indonesia untuk melayani kebutuhan tenaga kerja Anda.
                </p>
            </div>

            <Stagger
                staggerDelay={0.07}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {Object.entries(grouped).map(([province, provinceCities]) => (
                    <StaggerItem
                        key={province}
                        className="bg-aru-putih border border-surface-container-high rounded-xl p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-aru-merah">location_on</span>
                            <h3 className="font-heading font-bold text-lg text-aru-biru-tua">
                                {province}
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {provinceCities.map((city) => (
                                <span
                                    key={city.id}
                                    className="bg-aru-biru-muda text-aru-biru-tua text-[13px] font-semibold px-3 py-1 rounded-full"
                                >
                                    {city.city_name}
                                </span>
                            ))}
                        </div>
                    </StaggerItem>
                ))}
            </Stagger>
        </section>
    );
}
