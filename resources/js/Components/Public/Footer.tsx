import { Settings } from '@/types';

interface Props {
    settings: Settings;
}

export default function Footer({ settings }: Props) {
    return (
        <footer className="bg-aru-biru-tua py-20 w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-[1280px] mx-auto px-6">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                        <img
                            src="/images/logo/logo-original-white.png"
                            alt={`Logo ${settings.company_name || 'PT Alfa Reka Usaha'}`}
                            loading="lazy"
                            width="168"
                            height="40"
                            className="h-10 w-auto object-contain"
                        />
                        <span className="font-heading font-bold text-2xl text-aru-putih">
                            Alfa Reka Usaha
                        </span>
                    </div>
                    <p className="text-base leading-relaxed text-aru-biru-muda/70 max-w-md">
                        {settings.about_short}
                    </p>
                </div>

                <div>
                    <h4 className="font-heading font-bold text-lg tracking-[0.1em] uppercase text-aru-emas mb-4">
                        Tautan Penting
                    </h4>
                    <ul className="space-y-3 text-base">
                        <li>
                            <a href={settings.privacy_url || '#'} className="text-aru-biru-muda/70 hover:text-aru-putih hover:translate-x-1 transition-all inline-block">
                                Kebijakan Privasi
                            </a>
                        </li>
                        <li>
                            <a href={settings.terms_url || '#'} className="text-aru-biru-muda/70 hover:text-aru-putih hover:translate-x-1 transition-all inline-block">
                                Syarat &amp; Ketentuan
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-heading font-bold text-lg tracking-[0.1em] uppercase text-aru-emas mb-4">
                        Kantor Pusat
                    </h4>
                    <p className="text-base text-aru-biru-muda/70">
                        {settings.address}
                    </p>
                    {settings.phone && (
                        <p className="text-base text-aru-biru-muda/70 mt-2">
                            Tel: {settings.phone}
                        </p>
                    )}
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-6 mt-12 pt-8 border-t border-aru-biru-muda/10">
                <p className="text-base text-aru-biru-muda/50 text-center">
                    {settings.footer_copyright}
                </p>
            </div>
        </footer>
    );
}
