import { ClientItem } from '@/types';

interface Props {
    clients: ClientItem[];
}

export default function ClientsSection({ clients }: Props) {
    return (
        <section className="py-20 bg-aru-biru-muda" id="klien">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="text-center mb-12">
                    <div className="inline-block bg-aru-putih text-aru-biru-tua px-3 py-1 rounded text-[13px] font-semibold tracking-[0.08em] uppercase mb-4">
                        KLIEN KAMI
                    </div>
                    <h2 className="font-heading font-bold text-[40px] leading-[1.3] text-aru-biru-tua">
                        Dipercaya oleh Perusahaan Terkemuka
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {clients.map((client) => {
                        const CardContent = (
                            <>
                                {client.logo_url ? (
                                    <img
                                        src={client.logo_url}
                                        alt={client.name}
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

                        const className = "bg-aru-putih rounded p-6 flex items-center justify-center min-h-[100px] group hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer";

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
            </div>
        </section>
    );
}
