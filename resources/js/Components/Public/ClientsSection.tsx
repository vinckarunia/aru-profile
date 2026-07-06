import { ClientItem } from '@/types';
import { useState } from 'react';

interface Props {
    activeClients: ClientItem[];
    pastClients: ClientItem[];
}

export default function ClientsSection({ activeClients, pastClients }: Props) {
    const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');

    const displayedClients = activeTab === 'active' ? activeClients : pastClients;

    return (
        <section className="py-20 bg-aru-biru-muda" id="klien">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="text-center mb-8">
                    <div className="inline-block bg-aru-putih text-aru-merah px-3 py-1 rounded text-[13px] font-semibold tracking-[0.08em] uppercase mb-4">
                        KLIEN KAMI
                    </div>
                    <h2 className="font-heading font-bold text-[40px] leading-[1.3] text-aru-biru-tua">
                        Dipercaya oleh Perusahaan Terkemuka
                    </h2>
                </div>

                {/* Tab Switcher */}
                <div className="flex justify-center gap-4 mb-10">
                    <button
                        type="button"
                        onClick={() => setActiveTab('active')}
                        className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer ${
                            activeTab === 'active'
                                ? 'bg-aru-merah text-aru-putih shadow-md'
                                : 'bg-aru-putih text-aru-abu hover:text-aru-biru-tua hover:bg-white/80 border border-surface-container-high'
                        }`}
                    >
                        Klien Aktif
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('past')}
                        className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer ${
                            activeTab === 'past'
                                ? 'bg-aru-merah text-aru-putih shadow-md'
                                : 'bg-aru-putih text-aru-abu hover:text-aru-biru-tua hover:bg-white/80 border border-surface-container-high'
                        }`}
                    >
                        Klien Terdahulu
                    </button>
                </div>

                {displayedClients.length === 0 ? (
                    <div className="text-center py-16 bg-aru-putih/50 rounded-2xl border border-dashed border-aru-abu/20 max-w-md mx-auto">
                        <span className="material-symbols-outlined text-aru-abu/30 text-5xl mb-3 block">
                            business
                        </span>
                        <p className="text-aru-abu text-sm font-medium">
                            Belum ada data klien untuk kategori ini.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {displayedClients.map((client) => {
                            const CardContent = (
                                <>
                                    {client.logo_url ? (
                                        <img
                                            src={client.logo_url}
                                            alt={`Logo ${client.name}`}
                                            loading="lazy"
                                            width="120"
                                            height="64"
                                            className="max-h-16 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                                        />
                                    ) : (
                                        <div className="text-center">
                                            <span className="material-symbols-outlined text-aru-abu/40 text-3xl mb-1 block group-hover:text-aru-merah transition-colors">
                                                business
                                            </span>
                                            <span className="text-[11px] font-semibold text-aru-abu/60 leading-tight block">
                                                {client.name}
                                            </span>
                                        </div>
                                    )}
                                </>
                            );

                            const className = "bg-aru-putih rounded-xl p-6 flex items-center justify-center min-h-[100px] group hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer";

                            return client.website_url ? (
                                <a
                                    key={client.id}
                                    href={client.website_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={className}
                                    title={`${client.name} (Kunjungi website)`}
                                >
                                    {CardContent}
                                </a>
                            ) : (
                                <div
                                    key={client.id}
                                    className={className}
                                    title={client.name}
                                >
                                    {CardContent}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
