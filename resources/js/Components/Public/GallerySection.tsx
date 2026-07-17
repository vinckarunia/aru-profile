import { useState } from 'react';
import { GalleryItem } from '@/types';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'motion/react';
import { Stagger, StaggerItem } from '../Motion/Stagger';
import { useLanguage } from '@/Contexts/LanguageContext';

interface Props {
    items: GalleryItem[];
}

export default function GallerySection({ items }: Props) {
    const { t, getLocalized } = useLanguage();
    const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
    const shouldReduceMotion = useReducedMotion();

    const imageVariants: Variants = {
        initial: { scale: 1 },
        hover: shouldReduceMotion ? { scale: 1 } : { scale: 1.04 },
    };

    const overlayVariants: Variants = {
        initial: { backgroundColor: 'rgba(15, 29, 51, 0)' },
        hover: { backgroundColor: 'rgba(15, 29, 51, 0.5)' },
    };

    const textVariants: Variants = {
        initial: shouldReduceMotion ? { y: 0, opacity: 1 } : { y: 8, opacity: 0 },
        hover: { y: 0, opacity: 1 },
    };

    return (
        <section className="py-20 max-w-[1280px] mx-auto px-6" id="galeri">
            <div className="text-center mb-12 animate-fade-in">
                <div className="inline-block bg-aru-biru-muda text-aru-merah px-3 py-1 rounded text-[13px] font-semibold tracking-[0.08em] uppercase mb-4">
                    {t('nav_gallery')}
                </div>
                <h2 className="font-heading font-bold text-[40px] leading-[1.3] text-aru-biru-tua">
                    {t('gallery_title')}
                </h2>
            </div>

            <Stagger
                staggerDelay={0.07}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
                {items.map((item) => (
                    <StaggerItem
                        key={item.id}
                        as="div"
                        whileHover="hover"
                        initial="initial"
                        className="relative aspect-square overflow-hidden rounded group cursor-pointer"
                        onClick={() => setLightbox(item)}
                    >
                        {item.image_url ? (
                            <motion.img
                                src={item.thumb_url || item.image_url}
                                alt={getLocalized('title', item) || 'Foto Aktivitas PT Alfa Reka Usaha'}
                                loading="lazy"
                                width="400"
                                height="400"
                                variants={imageVariants}
                                transition={{ duration: 0.35, ease: 'easeOut' as const }}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-aru-biru-muda flex items-center justify-center">
                                <span className="material-symbols-outlined text-aru-abu/30 text-5xl" aria-hidden="true">
                                    photo_camera
                                </span>
                            </div>
                        )}
                        <motion.div
                            variants={overlayVariants}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex items-end"
                        >
                            {getLocalized('title', item) && (
                                <motion.div
                                    variants={textVariants}
                                    transition={{ duration: 0.3, ease: 'easeOut' as const }}
                                    className="p-4 w-full"
                                >
                                    <p className="text-aru-putih text-sm font-semibold">{getLocalized('title', item)}</p>
                                </motion.div>
                            )}
                        </motion.div>
                    </StaggerItem>
                ))}
            </Stagger>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
                        onClick={() => setLightbox(null)}
                    >
                        <motion.div
                            initial={shouldReduceMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={shouldReduceMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
                            transition={{ duration: 0.3, ease: 'easeOut' as const }}
                            className="relative max-w-4xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setLightbox(null)}
                                className="absolute -top-12 right-0 text-aru-putih hover:text-aru-merah transition-colors cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-3xl" aria-hidden="true">close</span>
                            </button>
                            {lightbox.image_url && (
                                <img
                                    src={lightbox.image_url}
                                    alt={getLocalized('title', lightbox) || 'Detail Foto Kegiatan'}
                                    className="w-full h-auto rounded"
                                />
                            )}
                            {(getLocalized('title', lightbox) || getLocalized('description', lightbox)) && (
                                <div className="mt-4 text-aru-putih">
                                    {getLocalized('title', lightbox) && <h3 className="font-heading font-semibold text-xl">{getLocalized('title', lightbox)}</h3>}
                                    {getLocalized('description', lightbox) && <p className="text-aru-putih/70 mt-1">{getLocalized('description', lightbox)}</p>}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
