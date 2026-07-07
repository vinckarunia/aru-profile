import { useState, useEffect } from 'react';
import { Settings } from '@/types';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'motion/react';
import { Stagger, StaggerItem } from '../Motion/Stagger';

interface Props {
    settings: Settings;
}

const navLinks = [
    { label: 'Tentang Kami', href: '#tentang' },
    { label: 'Layanan', href: '#layanan' },
    { label: 'Jangkauan', href: '#jangkauan' },
    { label: 'Klien', href: '#klien' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Legalitas', href: '#legalitas' },
];

export default function Navbar({ settings }: Props) {
    const [activeSection, setActiveSection] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        // Ambil semua elemen section berdasarkan ID dari objek navLinks
        const sectionElements = navLinks.map(link => document.querySelector(link.href));

        const observerOptions = {
            root: null, // menggunakan viewport browser
            rootMargin: '-50% 0px -50% 0px', // Memicu pergantian saat section berada di tengah layar
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                // Jika section tersebut mendominasi tampilan layar
                if (entry.isIntersecting && entry.target.id) {
                    setActiveSection(`#${entry.target.id}`);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Daftarkan setiap section ke dalam observer
        sectionElements.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const onScroll = () => {
            // Mengambil elemen section tentang kami berdasarkan ID-nya
            const aboutSection = document.getElementById('tentang');
            
            if (aboutSection) {
                // Mengambil posisi jarak bagian atas section terhadap layar viewport
                const topPos = aboutSection.getBoundingClientRect().top;
                
                // Jika topPos <= 72, artinya section tentang kami sudah menyentuh/berada di bawah navbar
                if (topPos <= 72) {
                    setScrolled(true);
                } else {
                    setScrolled(false);
                }
            } else {
                // Fallback jika elemen tidak ditemukan, menggunakan scroll standard
                setScrolled(window.scrollY > 400);
            }
        };

        window.addEventListener('scroll', onScroll);
        
        // Jalankan sekali saat pertama kali render untuk cek posisi awal
        onScroll();

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const menuVariants: Variants = {
        hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: -16 },
        visible: {
            opacity: 1,
            height: 'auto',
            y: 0,
            transition: { duration: 0.25, ease: 'easeOut' as const },
        },
        exit: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: -16, transition: { duration: 0.2, ease: 'easeIn' as const } },
    };

    return (
        <nav
            id="navbar"
            className={`fixed top-0 w-full h-[72px] z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-aru-putih shadow-lg'
                    : 'bg-aru-biru-tua/90 backdrop-blur-md'
            }`}
        >
            <div className="flex justify-between items-center px-6 max-w-[1280px] mx-auto h-full">
                {/* Logo / Brand */}
                <a href="#" className="flex items-center gap-3">
                    <img
                        src={scrolled ? "/images/logo/logo-original.png" : "/images/logo/logo-original-white.png"}
                        alt={settings.company_name ? `Logo ${settings.company_name}` : 'Logo PT Alfa Reka Usaha'}
                        width="168"
                        height="40"
                        className="h-10 w-auto object-contain"
                    />
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-x-8 items-center">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href;

                        return (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`text-[13px] font-semibold tracking-[0.08em] uppercase hover:text-aru-merah ${(scrolled ? 'text-aru-biru-tua' : 'text-aru-putih hover:text-aru-putih')} transition-colors duration-200 hover:scale-105`}
                            >
                                {link.label}
                            </a>
                        );
                    })}
                </div>

                {/* CTA + Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <motion.a
                        href="#kontak"
                        whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                        className="hidden md:inline-flex items-center justify-center bg-aru-merah text-aru-putih px-6 py-2.5 rounded text-[13px] font-semibold tracking-[0.08em] uppercase transition-colors"
                    >
                        Hubungi Kami
                    </motion.a>
                    <button
                        className="md:hidden relative w-8 h-8 flex items-center justify-center cursor-pointer"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={mobileOpen ? 'close' : 'menu'}
                                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: mobileOpen ? -90 : 90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: mobileOpen ? 90 : -90 }}
                                transition={{ duration: 0.2 }}
                                className={`material-symbols-outlined text-3xl absolute ${scrolled ? 'text-aru-biru-tua' : 'text-aru-putih'}`}
                            >
                                {mobileOpen ? 'close' : 'menu'}
                            </motion.span>
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                        className="md:hidden bg-aru-biru-tua border-t border-aru-putih/10 overflow-hidden"
                    >
                        <Stagger
                            staggerDelay={0.07}
                            useViewport={false}
                            className="flex flex-col py-4 px-6 space-y-4"
                        >
                            {navLinks.map((link) => (
                                <StaggerItem
                                    key={link.href}
                                    as="a"
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-[13px] font-semibold tracking-[0.08em] uppercase text-aru-putih hover:text-aru-merah transition-colors py-2"
                                >
                                    {link.label}
                                </StaggerItem>
                            ))}
                            <StaggerItem
                                as="a"
                                href="#kontak"
                                onClick={() => setMobileOpen(false)}
                                className="inline-flex items-center justify-center bg-aru-merah text-aru-putih px-6 py-3 rounded text-[13px] font-semibold tracking-[0.08em] uppercase"
                            >
                                Hubungi Kami
                            </StaggerItem>
                        </Stagger>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
