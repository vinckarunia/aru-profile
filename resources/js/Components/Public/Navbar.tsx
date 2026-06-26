import { useState, useEffect } from 'react';
import { Settings } from '@/types';

interface Props {
    settings: Settings;
}

const navLinks = [
    { label: 'Beranda', href: '#' },
    { label: 'Tentang Kami', href: '#tentang' },
    { label: 'Layanan', href: '#layanan' },
    { label: 'Jangkauan', href: '#jangkauan' },
    { label: 'Klien', href: '#klien' },
    { label: 'Legalitas', href: '#legalitas' },
];

export default function Navbar({ settings }: Props) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav
            id="navbar"
            className={`fixed top-0 w-full h-[72px] z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-aru-biru-tua shadow-lg'
                    : 'bg-aru-biru-tua/90 backdrop-blur-md'
            }`}
        >
            <div className="flex justify-between items-center px-6 max-w-[1280px] mx-auto h-full">
                {/* Logo / Brand */}
                <a href="#" className="flex items-center gap-3">
                    <img
                        src="/images/logo/logo-white.png"
                        alt={settings.company_name || 'Logo'}
                        className="h-10 w-auto"
                    />
                    <span className="font-heading font-bold text-lg text-aru-putih hidden sm:block tracking-wide">
                        Alfa Reka Usaha
                    </span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex space-x-8 items-center">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-[13px] font-semibold tracking-[0.08em] uppercase text-aru-putih hover:text-aru-merah transition-colors duration-200 hover:scale-105"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* CTA + Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <a
                        href="#kontak"
                        className="hidden md:inline-flex items-center justify-center bg-aru-merah text-aru-putih px-6 py-2.5 rounded text-[13px] font-semibold tracking-[0.08em] uppercase hover:scale-[1.03] active:scale-95 transition-all duration-150"
                    >
                        Hubungi Kami
                    </a>
                    <button
                        className="md:hidden text-aru-putih"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <span className="material-symbols-outlined text-3xl">
                            {mobileOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-aru-biru-tua border-t border-aru-putih/10 animate-[slideDown_0.2s_ease-out]">
                    <div className="flex flex-col py-4 px-6 space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="text-[13px] font-semibold tracking-[0.08em] uppercase text-aru-putih hover:text-aru-merah transition-colors py-2"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#kontak"
                            onClick={() => setMobileOpen(false)}
                            className="inline-flex items-center justify-center bg-aru-merah text-aru-putih px-6 py-3 rounded text-[13px] font-semibold tracking-[0.08em] uppercase"
                        >
                            Hubungi Kami
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
