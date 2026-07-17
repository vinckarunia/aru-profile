import { useState } from 'react';
import { CityItem } from '@/types';
import { Stagger, StaggerItem } from '../Motion/Stagger';
import IndonesiaMap from './IndonesiaMap';
import { useLanguage } from '@/Contexts/LanguageContext';

interface Props {
    cities: CityItem[];
}

export default function CoverageSection({ cities }: Props) {
    const { t, lang } = useLanguage();
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

    // Group cities by province/region, treating null province as 'Lainnya'
    const grouped = cities.reduce<Record<string, CityItem[]>>((acc, city) => {
        const province = city.province || 'Lainnya';
        if (!acc[province]) acc[province] = [];
        acc[province].push(city);
        return acc;
    }, {});

    // Ensure we filter out cities without ids to match map component type exactly
    const mapCities = cities.map(c => ({
        id: c.id,
        city_name: c.city_name,
        province: c.province || 'Lainnya'
    }));

    return (
        <section className="py-20 bg-surface-container-low" id="jangkauan">
            <div className="max-w-[1280px] mx-auto px-6 space-y-12">
                
                {/* Header */}
                <div className="text-center space-y-3 max-w-2xl mx-auto">
                    <div className="inline-block bg-aru-biru-muda text-aru-merah px-3 py-1 rounded text-[13px] font-semibold tracking-[0.08em] uppercase">
                        {t('nav_coverage')}
                    </div>
                    <h2 className="font-heading font-bold text-[36px] md:text-[40px] leading-[1.2] text-aru-biru-tua">
                        {t('coverage_title')}
                    </h2>
                    <p className="text-sm md:text-base text-aru-abu leading-relaxed">
                        {lang === 'id' 
                            ? `Kami hadir di ${cities.length} kota di seluruh wilayah strategis Indonesia untuk memastikan kebutuhan ketenagakerjaan dan logistik Anda terpenuhi dengan optimal.`
                            : `We are present in ${cities.length} cities across strategic regions of Indonesia to ensure your workforce and logistics needs are met optimally.`
                        }
                    </p>
                </div>

                {/* Full-width Map Container */}
                <div className="space-y-4">
                    <IndonesiaMap 
                        cities={mapCities} 
                        hoveredRegion={hoveredRegion} 
                        onHoverRegion={setHoveredRegion} 
                    />
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 text-xs text-aru-abu">
                        <span className="flex items-center gap-2">
                            <span className="w-3.5 h-3.5 bg-aru-merah/25 border border-aru-merah/45 rounded-full inline-block"></span>
                            <span className="font-semibold text-aru-biru-tua">{t('coverage_map_legend')}</span>
                        </span>
                        <span className="italic flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">info</span>
                            {t('coverage_map_instruction')}
                        </span>
                    </div>
                </div>

                {/* Province/City Cards Grid Underneath */}
                <div className="pt-4">
                    <Stagger staggerDelay={0.03} useViewport={false} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {Object.entries(grouped).map(([province, provinceCities]) => {
                            const isHighlighted = hoveredRegion === province;
                            return (
                                <StaggerItem
                                    key={province}
                                    onMouseEnter={() => setHoveredRegion(province)}
                                    onMouseLeave={() => setHoveredRegion(null)}
                                    className={`bg-white border rounded-xl p-4 transition-all duration-300 ${
                                        isHighlighted
                                            ? 'border-aru-merah shadow-md ring-1 ring-aru-merah/30 -translate-y-1'
                                            : 'border-surface-container-high hover:border-aru-biru-tua/20 hover:-translate-y-0.5'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-3 border-b border-surface-container-high pb-2">
                                        <div className="flex items-center gap-1.5 min-w-0">
                                            <span className={`material-symbols-outlined text-base flex-shrink-0 transition-colors ${
                                                isHighlighted ? 'text-aru-merah' : 'text-aru-biru-tua/50'
                                            }`}>
                                                location_on
                                            </span>
                                            <h3 className="font-heading font-black text-[13px] text-aru-biru-tua truncate">
                                                {province}
                                            </h3>
                                        </div>
                                        <span className="text-[9px] font-bold bg-aru-biru-muda text-aru-biru-tua px-2 py-0.5 rounded-full flex-shrink-0">
                                            {provinceCities.length} {lang === 'id' ? 'Kota' : 'Cities'}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {provinceCities.map((city) => (
                                            <span
                                                key={city.id}
                                                className={`text-[10px] font-semibold px-2 py-0.5 rounded transition-colors ${
                                                    isHighlighted
                                                        ? 'bg-aru-merah/10 text-aru-merah'
                                                        : 'bg-surface-container-low text-aru-biru-tua hover:bg-aru-biru-muda'
                                                }`}
                                            >
                                                {city.city_name}
                                            </span>
                                        ))}
                                    </div>
                                </StaggerItem>
                            );
                        })}
                    </Stagger>
                </div>

            </div>
        </section>
    );
}
