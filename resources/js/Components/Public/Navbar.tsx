import { useState, useEffect } from 'react';
import { Settings } from '@/types';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'motion/react';
import { Stagger, StaggerItem } from '../Motion/Stagger';
import { useLanguage } from '@/Contexts/LanguageContext';
import { translations } from '@/translations';

interface Props {
    settings: Settings;
}

export default function Navbar({ settings }: Props) {
    const { lang, setLang, t } = useLanguage();
    const [activeSection, setActiveSection] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const navLinks: { labelKey: keyof typeof translations['id']; href: string; isExternal: boolean }[] = [
        { labelKey: 'nav_about', href: '#tentang', isExternal: false },
        { labelKey: 'nav_services', href: '#layanan', isExternal: false },
        { labelKey: 'nav_coverage', href: '#jangkauan', isExternal: false },
        { labelKey: 'nav_clients', href: '#klien', isExternal: false },
        { labelKey: 'nav_gallery', href: '#galeri', isExternal: false },
        { labelKey: 'nav_legal', href: '#legalitas', isExternal: false },
        { labelKey: 'nav_careers', href: settings.careers_url || 'https://careers.aru-pt.id', isExternal: true },
    ];

    useEffect(() => {
        const sectionElements = navLinks
            .filter(link => !link.isExternal)
            .map(link => document.querySelector(link.href));

        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.target.id) {
                    setActiveSection(`#${entry.target.id}`);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sectionElements.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const onScroll = () => {
            const aboutSection = document.getElementById('tentang');
            
            if (aboutSection) {
                const topPos = aboutSection.getBoundingClientRect().top;
                if (topPos <= 72) {
                    setScrolled(true);
                } else {
                    setScrolled(false);
                }
            } else {
                setScrolled(window.scrollY > 400);
            }
        };

        window.addEventListener('scroll', onScroll);
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
            data-nosnippet
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
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-x-6 items-center">
                    {navLinks.map((link) => {
                        const isActive = !link.isExternal && activeSection === link.href;

                        return (
                            <a
                                key={link.href}
                                href={link.href}
                                target={link.isExternal ? '_blank' : undefined}
                                rel={link.isExternal ? 'noopener noreferrer' : undefined}
                                className={`text-[12px] font-bold tracking-[0.08em] uppercase transition-all duration-200 hover:scale-105 ${
                                    isActive
                                        ? 'text-aru-merah border-b-2 border-aru-merah'
                                        : scrolled
                                            ? 'text-aru-biru-tua hover:text-aru-merah'
                                            : 'text-aru-putih hover:text-aru-merah'
                                }`}
                            >
                                {t(link.labelKey)}
                            </a>
                        );
                    })}
                </div>

                {/* CTA + Language Toggle + Mobile Toggle */}
                <div className="flex items-center gap-4">
                    {/* Language Switcher */}
                    <div className={`hidden md:flex items-center rounded-full px-1 py-1 border transition-colors ${
                        scrolled
                            ? 'bg-aru-biru-muda/55 border-aru-biru-tua/10'
                            : 'bg-white/10 border-white/10'
                    }`}>
                        <button
                            onClick={() => setLang('id')}
                            className={`px-2.5 py-1 text-[10px] font-black rounded-full transition-all ${
                                lang === 'id'
                                    ? 'bg-aru-merah text-white shadow-md'
                                    : scrolled
                                        ? 'text-aru-biru-tua/75 hover:text-aru-merah'
                                        : 'text-white/70 hover:text-white'
                            }`}
                        >
                            ID
                        </button>
                        <button
                            onClick={() => setLang('en')}
                            className={`px-2.5 py-1 text-[10px] font-black rounded-full transition-all ${
                                lang === 'en'
                                    ? 'bg-aru-merah text-white shadow-md'
                                    : scrolled
                                        ? 'text-aru-biru-tua/75 hover:text-aru-merah'
                                        : 'text-white/70 hover:text-white'
                            }`}
                        >
                            EN
                        </button>
                    </div>

                    <motion.a
                        href="#kontak"
                        whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                        className="hidden md:inline-flex items-center justify-center bg-aru-merah text-aru-putih px-5 py-2.5 rounded text-[12px] font-semibold tracking-[0.08em] uppercase transition-colors"
                    >
                        {t('nav_contact')}
                    </motion.a>

                    <button
                        className="md:hidden relative w-8 h-8 flex items-center justify-center cursor-pointer"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={mobileOpen ? 'close' : 'menu'}
                                aria-hidden="true"
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
                                    target={link.isExternal ? '_blank' : undefined}
                                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-[13px] font-semibold tracking-[0.08em] uppercase text-aru-putih hover:text-aru-merah transition-colors py-2"
                                >
                                    {t(link.labelKey)}
                                </StaggerItem>
                            ))}
                            
                            {/* Mobile Language Switcher */}
                            <StaggerItem className="flex items-center justify-between border-t border-aru-putih/10 pt-4 pb-2">
                                <span className="text-[11px] font-bold text-aru-putih/60 uppercase tracking-wide">Language / Bahasa</span>
                                <div className="flex bg-white/5 rounded-full p-0.5 border border-white/10">
                                    <button
                                        onClick={() => setLang('id')}
                                        className={`px-3 py-1.5 text-[10px] font-bold rounded-full transition-all ${
                                            lang === 'id' ? 'bg-aru-merah text-white' : 'text-white/60'
                                        }`}
                                    >
                                        INDONESIA
                                    </button>
                                    <button
                                        onClick={() => setLang('en')}
                                        className={`px-3 py-1.5 text-[10px] font-bold rounded-full transition-all ${
                                            lang === 'en' ? 'bg-aru-merah text-white' : 'text-white/60'
                                        }`}
                                    >
                                        ENGLISH
                                    </button>
                                </div>
                            </StaggerItem>

                            <StaggerItem
                                as="a"
                                href="#kontak"
                                onClick={() => setMobileOpen(false)}
                                className="inline-flex items-center justify-center bg-aru-merah text-aru-putih px-6 py-3 rounded text-[13px] font-semibold tracking-[0.08em] uppercase"
                            >
                                {t('nav_contact')}
                            </StaggerItem>
                        </Stagger>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
