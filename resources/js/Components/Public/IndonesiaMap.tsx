import { useState, useRef } from 'react';
import indonesiaPaths from './indonesia_paths.json';
import { useLanguage } from '@/Contexts/LanguageContext';

// Map path IDs to DB-seeding region categories
const provinceToRegionMap: Record<string, string> = {
    // Sumatera (Only highlight provinces with active offices: Sumut, Kep. Riau, Sumsel, Lampung)
    'ID.SU': 'Sumatera',     // Sumut (Medan)
    'ID.KR': 'Sumatera',     // Kep. Riau (Batam)
    'ID.SL': 'Sumatera',     // Sumsel (Palembang)
    'ID.1024': 'Sumatera',   // Lampung (Lampung)

    // Jabodetabek (Jakarta, Banten)
    'ID.JK': 'Jabodetabek',  // Jakarta
    'ID.BT': 'Jabodetabek',  // Banten (Tangerang)

    // Jawa Barat
    'ID.JR': 'Jawa Barat',   // Jawa Barat (Bandung, Karawang, Cirebon, Purwakarta)

    // Jawa Tengah & Jogja
    'ID.JT': 'Jawa Tengah & Jogja', // Jawa Tengah (Semarang, Solo, Tegal)
    'ID.YO': 'Jawa Tengah & Jogja', // Yogyakarta

    // Jawa Timur & Bali
    'ID.JI': 'Jawa Timur & Bali',   // Jawa Timur (Surabaya, Madiun, Kediri, Mojokerto, Gresik)
    'ID.BA': 'Jawa Timur & Bali',   // Bali (Denpasar)

    // Kalimantan (Only East Kalimantan)
    'ID.KI': 'Kalimantan',   // Kaltim (Balikpapan, Samarinda)

    // Sulawesi (Only North & South Sulawesi)
    'ID.SW': 'Sulawesi',     // Sulut (Manado)
    'ID.SE': 'Sulawesi',     // Sulsel (Makassar)
};

// Approximate city coordinates for SVG 700x234 layout
const cityMarkers = [
    // Sumatera
    { name: 'Medan', x: 55, y: 30, region: 'Sumatera' },
    { name: 'Batam', x: 135, y: 45, region: 'Sumatera' },
    { name: 'Palembang', x: 120, y: 100, region: 'Sumatera' },
    { name: 'Lampung', x: 145, y: 145, region: 'Sumatera' },
    
    // Jabodetabek
    { name: 'Jakarta', x: 175, y: 175, region: 'Jabodetabek' },
    { name: 'Bekasi', x: 182, y: 176, region: 'Jabodetabek' },
    { name: 'Cikarang', x: 186, y: 176, region: 'Jabodetabek' },
    { name: 'Cibitung', x: 184, y: 176, region: 'Jabodetabek' },
    { name: 'Tangerang', x: 168, y: 175, region: 'Jabodetabek' },
    { name: 'Depok', x: 174, y: 180, region: 'Jabodetabek' },
    { name: 'Bogor', x: 175, y: 186, region: 'Jabodetabek' },
    { name: 'Cibinong', x: 175, y: 183, region: 'Jabodetabek' },
    { name: 'Cibubur', x: 178, y: 180, region: 'Jabodetabek' },
    
    // Jawa Barat
    { name: 'Bandung', x: 195, y: 185, region: 'Jawa Barat' },
    { name: 'Karawang', x: 188, y: 178, region: 'Jawa Barat' },
    { name: 'Purwakarta', x: 191, y: 180, region: 'Jawa Barat' },
    { name: 'Cirebon', x: 212, y: 183, region: 'Jawa Barat' },
    
    // Jawa Tengah & Jogja
    { name: 'Tegal', x: 220, y: 181, region: 'Jawa Tengah & Jogja' },
    { name: 'Semarang', x: 230, y: 180, region: 'Jawa Tengah & Jogja' },
    { name: 'Yogyakarta', x: 232, y: 192, region: 'Jawa Tengah & Jogja' },
    { name: 'Solo', x: 242, y: 188, region: 'Jawa Tengah & Jogja' },
    
    // Jawa Timur & Bali
    { name: 'Madiun', x: 254, y: 188, region: 'Jawa Timur & Bali' },
    { name: 'Kediri', x: 258, y: 191, region: 'Jawa Timur & Bali' },
    { name: 'Surabaya', x: 270, y: 185, region: 'Jawa Timur & Bali' },
    { name: 'Mojokerto', x: 265, y: 187, region: 'Jawa Timur & Bali' },
    { name: 'Gresik', x: 268, y: 183, region: 'Jawa Timur & Bali' },
    { name: 'Denpasar', x: 315, y: 195, region: 'Jawa Timur & Bali' },
    
    // Kalimantan
    { name: 'Balikpapan', x: 330, y: 90, region: 'Kalimantan' },
    { name: 'Samarinda', x: 335, y: 80, region: 'Kalimantan' },
    
    // Sulawesi
    { name: 'Manado', x: 446, y: 52, region: 'Sulawesi' },
    { name: 'Makassar', x: 382, y: 142, region: 'Sulawesi' },
];

interface IndonesiaMapProps {
    cities: Array<{ id: number; city_name: string; province: string }>;
    hoveredRegion: string | null;
    onHoverRegion: (region: string | null) => void;
}

export default function IndonesiaMap({ cities, hoveredRegion, onHoverRegion }: IndonesiaMapProps) {
    const { t } = useLanguage();
    const [tooltip, setTooltip] = useState<{ region: string; cities: string[]; x: number; y: number } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Group cities by region
    const citiesByRegion = cities.reduce<Record<string, string[]>>((acc, city) => {
        if (!acc[city.province]) {
            acc[city.province] = [];
        }
        acc[city.province].push(city.city_name);
        return acc;
    }, {});

    const handleMouseMove = (e: React.MouseEvent, region: string) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        
        // Calculate coordinate relative to the parent container
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setTooltip({
            region,
            cities: citiesByRegion[region] || [],
            x,
            y
        });
    };

    const handleMouseLeave = () => {
        setTooltip(null);
        onHoverRegion(null);
    };

    const handleMouseEnter = (region: string) => {
        onHoverRegion(region);
    };

    return (
        <div 
            ref={containerRef}
            className="relative w-full overflow-visible select-none bg-white border border-surface-container-high rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
            <style>{`
                @keyframes svg-pulse {
                    0% {
                        r: 2px;
                        opacity: 1;
                        stroke-width: 1px;
                    }
                    50% {
                        opacity: 0.6;
                    }
                    100% {
                        r: 9px;
                        opacity: 0;
                        stroke-width: 0.5px;
                    }
                }
                .svg-pin-pulse {
                    animation: svg-pulse 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
                    transform-origin: center;
                    transform-box: fill-box;
                }
            `}</style>

            <svg
                viewBox="0 0 700 234"
                className="w-full h-auto overflow-visible"
                style={{ filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.06))' }}
            >
                {/* Outlines of all Provinces */}
                <g id="provinces">
                    {indonesiaPaths.map((path) => {
                        const region = provinceToRegionMap[path.id];
                        const isActive = !!region;
                        const isHighlighted = hoveredRegion === region;

                        return (
                            <path
                                key={path.id}
                                d={path.d}
                                onMouseEnter={isActive ? () => handleMouseEnter(region) : undefined}
                                onMouseMove={isActive ? (e) => handleMouseMove(e, region) : undefined}
                                onMouseLeave={isActive ? handleMouseLeave : undefined}
                                className={`transition-all duration-300 ${
                                    isActive
                                        ? isHighlighted
                                            ? 'fill-aru-merah stroke-aru-merah/40 stroke-[1px] cursor-pointer scale-[1.002] origin-center shadow-lg'
                                            : 'fill-aru-biru-tua/20 hover:fill-aru-merah hover:stroke-aru-merah/40 stroke-white stroke-[0.5px] cursor-pointer'
                                        : 'fill-aru-biru-tua/5 stroke-white stroke-[0.3px]'
                                }`}
                                style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
                            />
                        );
                    })}
                </g>

                {/* Animated City Pins */}
                <g id="city-pins" className="pointer-events-none">
                    {cityMarkers.map((marker, index) => {
                        const isHighlighted = hoveredRegion === marker.region;
                        return (
                            <g key={index} className="transition-all duration-300">
                                {/* Pulse Effect */}
                                {isHighlighted && (
                                    <circle
                                        cx={marker.x}
                                        cy={marker.y}
                                        className="fill-aru-merah/40 stroke-aru-merah/60 svg-pin-pulse"
                                    />
                                )}
                                {/* Solid center pin */}
                                <circle
                                    cx={marker.x}
                                    cy={marker.y}
                                    r={isHighlighted ? "3" : "2"}
                                    className={`transition-all duration-300 ${
                                        isHighlighted 
                                            ? 'fill-white stroke-aru-merah stroke-2' 
                                            : 'fill-aru-biru-tua/50'
                                    }`}
                                />
                            </g>
                        );
                    })}
                </g>
            </svg>

            {/* Custom Interactive Tooltip */}
            {tooltip && tooltip.cities.length > 0 && (
                <div
                    className="absolute bg-aru-biru-tua/95 backdrop-blur-sm border border-aru-merah/20 text-aru-putih p-4 rounded-xl shadow-xl z-30 pointer-events-none w-56 flex flex-col gap-2 transition-all duration-100 ease-out"
                    style={{
                        left: `${tooltip.x + 20}px`,
                        top: `${tooltip.y + 10}px`,
                    }}
                >
                    <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                        <span className="font-heading font-black text-xs uppercase tracking-wider text-aru-merah">
                            {tooltip.region}
                        </span>
                        <span className="text-[9px] bg-aru-merah/25 text-aru-putih px-1.5 py-0.5 rounded-full font-bold">
                            {tooltip.cities.length} {t('nav_services') === 'Services' ? 'Cities' : 'Kota'}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto pr-1">
                        {tooltip.cities.map((city, idx) => (
                            <span
                                key={idx}
                                className="bg-white/10 hover:bg-white/20 text-[10px] font-semibold text-white px-2 py-0.5 rounded transition-colors"
                            >
                                {city}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
