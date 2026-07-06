import { useForm, usePage } from '@inertiajs/react';
import { Settings, PageProps } from '@/types';
import { FormEvent } from 'react';

interface Props {
    settings: Settings;
}

export default function ContactSection({ settings }: Props) {
    const { flash } = usePage<PageProps>().props;
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

                {flash?.success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded text-center">
                        {flash.success}
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-aru-putih rounded-lg p-6">
                            <h3 className="font-heading font-bold text-lg text-aru-biru-tua mb-4">Informasi Kontak</h3>
                            <div className="space-y-4">
                                {settings.address && (
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-aru-merah mt-0.5">location_on</span>
                                        <p className="text-base text-aru-abu">{settings.address}</p>
                                    </div>
                                )}
                                {settings.phone && (
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-aru-merah">phone</span>
                                        <a href={`tel:${settings.phone}`} className="text-base text-aru-abu hover:text-aru-merah transition-colors">
                                            {settings.phone}
                                        </a>
                                    </div>
                                )}
                                {settings.email && (
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-aru-merah">mail</span>
                                        <a href={`mailto:${settings.email}`} className="text-base text-aru-abu hover:text-aru-merah transition-colors">
                                            {settings.email as string}
                                        </a>
                                    </div>
                                )}
                                {settings.whatsapp && (
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-aru-merah">chat</span>
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
                        </div>

                        {settings.maps_embed_url && (
                            <div className="rounded overflow-hidden h-[250px]">
                                <iframe
                                    src={settings.maps_embed_url as string}
                                    className="w-full h-full border-0 rounded-lg"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Lokasi Kantor"
                                />
                            </div>
                        )}
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={submit} className="space-y-6">
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

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-aru-merah text-aru-putih px-8 py-3 rounded text-[13px] font-semibold tracking-[0.08em] uppercase hover:scale-[1.03] active:scale-95 transition-all disabled:opacity-50"
                        >
                            {processing ? 'Mengirim...' : 'Kirim Pesan'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
