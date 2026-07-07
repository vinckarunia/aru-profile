import { useForm, usePage } from '@inertiajs/react';
import { Settings, PageProps } from '@/types';
import { FormEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'motion/react';
import { Stagger, StaggerItem } from '../Motion/Stagger';

interface Props {
    settings: Settings;
}

export default function ContactSection({ settings }: Props) {
    const { flash } = usePage<PageProps>().props;
    const shouldReduceMotion = useReducedMotion();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        website_verification: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/contact', { onSuccess: () => reset() });
    };

    const formVariants: Variants = {
        hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.1, ease: 'easeOut' as const },
        },
    };

    return (
        <section id="kontak" className="py-20 bg-aru-biru-muda">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="text-center mb-12">
                    <div className="inline-block bg-aru-putih text-aru-merah px-3 py-1 rounded text-[13px] font-semibold tracking-[0.08em] uppercase mb-4">
                        HUBUNGI KAMI
                    </div>
                    <h2 className="font-heading font-bold text-[40px] leading-[1.3] text-aru-biru-tua">
                        Siap Berdiskusi?
                    </h2>
                </div>

                <AnimatePresence>
                    {flash?.success && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: 'easeOut' as const }}
                            className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded text-center overflow-hidden"
                        >
                            {flash.success}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <Stagger staggerDelay={0.08} className="space-y-6">
                        <StaggerItem data-nosnippet className="bg-aru-putih rounded-lg p-6">
                            <h3 className="font-heading font-bold text-lg text-aru-biru-tua mb-4">Informasi Kontak</h3>
                            <div className="space-y-4">
                                {settings.address && (
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-aru-merah mt-0.5" aria-hidden="true">location_on</span>
                                        <p className="text-base text-aru-abu">{settings.address}</p>
                                    </div>
                                )}
                                {settings.phone && (
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-aru-merah" aria-hidden="true">phone</span>
                                        <a href={`tel:${settings.phone}`} className="text-base text-aru-abu hover:text-aru-merah transition-colors">
                                            {settings.phone}
                                        </a>
                                    </div>
                                )}
                                {settings.email && (
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-aru-merah" aria-hidden="true">mail</span>
                                        <a href={`mailto:${settings.email}`} className="text-base text-aru-abu hover:text-aru-merah transition-colors">
                                            {settings.email as string}
                                        </a>
                                    </div>
                                )}
                                {settings.whatsapp && (
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-aru-merah" aria-hidden="true">chat</span>
                                        <a
                                            href={`https://wa.me/${settings.whatsapp}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-base text-aru-abu hover:text-aru-merah transition-colors"
                                        >
                                            WhatsApp
                                        </a>
                                    </div>
                                )}
                            </div>
                        </StaggerItem>

                        {settings.maps_embed_url && (
                            <StaggerItem className="rounded overflow-hidden h-[250px]">
                                <iframe
                                    src={settings.maps_embed_url as string}
                                    className="w-full h-full border-0 rounded-lg"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Lokasi Kantor"
                                />
                            </StaggerItem>
                        )}
                    </Stagger>

                    {/* Contact Form */}
                    <motion.form
                        onSubmit={submit}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={formVariants}
                        className="space-y-6"
                    >
                        {/* Honeypot field */}
                        <div className="hidden" aria-hidden="true">
                            <label className="block text-[11px] font-normal uppercase tracking-wide text-aru-abu mb-1">Verify Website</label>
                            <input
                                type="text"
                                name="website_verification"
                                value={data.website_verification}
                                onChange={e => setData('website_verification', e.target.value)}
                                autoComplete="off"
                                tabIndex={-1}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[11px] font-normal uppercase tracking-wide text-aru-abu mb-1">Nama <span className="text-aru-merah">*</span></label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full border-b border-aru-abu focus:border-aru-merah outline-none py-2 text-base bg-transparent"
                                />
                                {errors.name && <p className="text-error text-[11px] mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-[11px] font-normal uppercase tracking-wide text-aru-abu mb-1">Perusahaan</label>
                                <input
                                    type="text"
                                    value={data.company}
                                    onChange={e => setData('company', e.target.value)}
                                    className="w-full border-b border-aru-abu focus:border-aru-merah outline-none py-2 text-base bg-transparent"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[11px] font-normal uppercase tracking-wide text-aru-abu mb-1">Email <span className="text-aru-merah">*</span></label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full border-b border-aru-abu focus:border-aru-merah outline-none py-2 text-base bg-transparent"
                                />
                                {errors.email && <p className="text-error text-[11px] mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-[11px] font-normal uppercase tracking-wide text-aru-abu mb-1">Telepon</label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                    className="w-full border-b border-aru-abu focus:border-aru-merah outline-none py-2 text-base bg-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-normal uppercase tracking-wide text-aru-abu mb-1">Subjek</label>
                            <input
                                type="text"
                                value={data.subject}
                                onChange={e => setData('subject', e.target.value)}
                                className="w-full border-b border-aru-abu focus:border-aru-merah outline-none py-2 text-base bg-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-normal uppercase tracking-wide text-aru-abu mb-1">Pesan <span className="text-aru-merah">*</span></label>
                            <textarea
                                value={data.message}
                                onChange={e => setData('message', e.target.value)}
                                rows={4}
                                className="w-full border-b border-aru-abu focus:border-aru-merah outline-none py-2 text-base bg-transparent resize-y"
                            />
                            {errors.message && <p className="text-error text-[11px] mt-1">{errors.message}</p>}
                        </div>

                        <motion.button
                            type="submit"
                            disabled={processing}
                            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                            className="bg-aru-merah text-aru-putih px-8 py-3 rounded text-[13px] font-semibold tracking-[0.08em] uppercase disabled:opacity-50 transition-colors cursor-pointer"
                        >
                            {processing ? 'Mengirim...' : 'Kirim Pesan'}
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
