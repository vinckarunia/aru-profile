import { useState } from 'react';
import { GalleryItem } from '@/types';

interface Props {
    items: GalleryItem[];
}

export default function GallerySection({ items }: Props) {
    const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

    return (
        <section className="py-20 max-w-[1280px] mx-auto px-6" id="galeri">
            <div className="text-center mb-12">
                <div className="inline-block bg-aru-biru-muda text-aru-merah px-3 py-1 rounded text-[13px] font-semibold tracking-[0.08em] uppercase mb-4">
                    GALERI
                </div>
                <h2 className="font-heading font-bold text-[40px] leading-[1.3] text-aru-biru-tua">
                    Aktivitas Kami
                </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="relative aspect-square overflow-hidden rounded group cursor-pointer"
                        onClick={() => setLightbox(item)}
                    >
                        {item.image_url ? (
                            <img
                                src={item.thumb_url || item.image_url}
                                alt={item.title || 'Foto Aktivitas PT Alfa Reka Usaha'}
                                loading="lazy"
                                width="400"
                                height="400"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full bg-aru-biru-muda flex items-center justify-center">
                                <span className="material-symbols-outlined text-aru-abu/30 text-5xl">
                                    photo_camera
                                </span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-aru-biru-tua/0 group-hover:bg-aru-biru-tua/50 transition-all duration-300 flex items-end">
                            {item.title && (
                                <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-aru-putih text-sm font-semibold">{item.title}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
                    onClick={() => setLightbox(null)}
                >
                    <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setLightbox(null)}
                            className="absolute -top-12 right-0 text-aru-putih hover:text-aru-merah transition-colors"
                        >
                            <span className="material-symbols-outlined text-3xl">close</span>
                        </button>
                        {lightbox.image_url && (
                            <img
                                src={lightbox.image_url}
                                alt={lightbox.title || 'Detail Foto Kegiatan'}
                                className="w-full h-auto rounded"
                            />
                        )}
                        {(lightbox.title || lightbox.description) && (
                            <div className="mt-4 text-aru-putih">
                                {lightbox.title && <h3 className="font-heading font-semibold text-xl">{lightbox.title}</h3>}
                                {lightbox.description && <p className="text-aru-putih/70 mt-1">{lightbox.description}</p>}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
