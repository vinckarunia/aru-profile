import { useState, FormEvent } from 'react';
import { useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/Contexts/LanguageContext';

interface TestimonialItem {
    id: number;
    name: string;
    company_or_position: string;
    type: 'corporate' | 'worker';
    testimonial: string;
    rating: number;
    avatar_url: string | null;
}

interface Props {
    testimonials: TestimonialItem[];
}

export default function TestimonialsSection({ testimonials }: Props) {
    const { t, lang } = useLanguage();
    const [activeTab, setActiveTab] = useState<'corporate' | 'worker'>('corporate');
    const [modalOpen, setModalOpen] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const filtered = testimonials.filter(t => t.type === activeTab);

    // Form setup using Inertia's useForm hook
    const form = useForm({
        name: '',
        company_or_position: '',
        type: 'corporate' as 'corporate' | 'worker',
        rating: 5,
        testimonial: '',
    });

    const handleOpenModal = () => {
        form.reset();
        form.setData('type', activeTab); // pre-set type to active tab
        setSuccessMsg(null);
        setModalOpen(true);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        form.post('/testimonials', {
            preserveScroll: true,
            onSuccess: (page) => {
                setSuccessMsg(t('testimonials_form_success'));
                form.reset();
                setTimeout(() => {
                    setModalOpen(false);
                    setSuccessMsg(null);
                }, 4000);
            }
        });
    };

    return (
        <section className="py-20 bg-surface" id="testimoni">
            <div className="max-w-[1280px] mx-auto px-6 space-y-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-3 max-w-xl">
                        <div className="inline-block bg-aru-merah/10 text-aru-merah px-3 py-1 rounded text-[11px] font-bold tracking-[0.08em] uppercase">
                            {t('testimonials_title')}
                        </div>
                        <h2 className="font-heading font-bold text-[36px] md:text-[40px] leading-[1.2] text-aru-biru-tua">
                            {lang === 'id' ? 'Apa Kata Mereka' : 'What Our Partners Say'}
                        </h2>
                        <p className="text-sm md:text-base text-aru-abu leading-relaxed">
                            {t('testimonials_subtitle')}
                        </p>
                    </div>

                    <button
                        onClick={handleOpenModal}
                        className="bg-aru-merah text-aru-putih px-6 py-3 rounded-lg text-sm font-bold tracking-wide uppercase hover:bg-aru-merah/90 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-md self-start md:self-auto"
                    >
                        {t('testimonials_btn_submit')}
                    </button>
                </div>

                {/* Tabs Switcher */}
                <div className="flex border-b border-surface-container-high pb-px max-w-md">
                    <button
                        onClick={() => setActiveTab('corporate')}
                        className={`flex-1 text-center py-3 text-sm font-bold tracking-wide uppercase border-b-2 transition-all ${
                            activeTab === 'corporate'
                                ? 'border-aru-merah text-aru-merah'
                                : 'border-transparent text-aru-abu hover:text-aru-biru-tua'
                        }`}
                    >
                        {t('testimonials_tab_corporate')}
                    </button>
                    <button
                        onClick={() => setActiveTab('worker')}
                        className={`flex-1 text-center py-3 text-sm font-bold tracking-wide uppercase border-b-2 transition-all ${
                            activeTab === 'worker'
                                ? 'border-aru-merah text-aru-merah'
                                : 'border-transparent text-aru-abu hover:text-aru-biru-tua'
                        }`}
                    >
                        {t('testimonials_tab_worker')}
                    </button>
                </div>

                {/* Review Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="wait">
                        {filtered.length > 0 ? (
                            filtered.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="bg-white border border-surface-container-high rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-aru-merah/25 transition-all flex flex-col justify-between"
                                >
                                    <div className="space-y-4">
                                        {/* Stars */}
                                        <div className="flex gap-0.5 text-amber-500">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <span
                                                    key={i}
                                                    className="material-symbols-outlined text-lg"
                                                    style={{ fontVariationSettings: `"'FILL' ${i < item.rating ? 1 : 0}"` }}
                                                >
                                                    star
                                                </span>
                                            ))}
                                        </div>

                                        {/* Testimonial Text */}
                                        <p className="text-sm md:text-base text-aru-abu leading-relaxed italic">
                                            &ldquo;{item.testimonial}&rdquo;
                                        </p>
                                    </div>

                                    {/* Author Profile */}
                                    <div className="flex items-center gap-3 pt-6 border-t border-surface-container-low mt-6">
                                        {item.avatar_url ? (
                                            <img
                                                src={item.avatar_url}
                                                alt={item.name}
                                                className="w-10 h-10 rounded-full object-cover border border-aru-merah/20"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-aru-biru-muda text-aru-biru-tua flex items-center justify-center font-bold text-sm">
                                                {item.name.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <h4 className="font-bold text-sm text-aru-biru-tua">{item.name}</h4>
                                            <p className="text-xs text-aru-abu font-semibold">{item.company_or_position}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-16 text-center text-aru-abu border border-dashed border-surface-container-high rounded-2xl">
                                <span className="material-symbols-outlined text-4xl text-aru-abu/40 mb-2">rate_review</span>
                                <p className="text-sm">{t('testimonials_empty')}</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

            </div>

            {/* Submission Modal Form Overlay */}
            <AnimatePresence>
                {modalOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-surface-container-high relative"
                        >
                            <button
                                onClick={() => setModalOpen(false)}
                                className="absolute top-4 right-4 text-aru-abu hover:text-aru-biru-tua cursor-pointer p-1"
                            >
                                <span className="material-symbols-outlined text-2xl">close</span>
                            </button>

                            <div className="p-6 md:p-8 space-y-6">
                                <div className="space-y-1">
                                    <h3 className="font-heading font-black text-xl text-aru-biru-tua">
                                        {t('testimonials_form_title')}
                                    </h3>
                                    <p className="text-xs text-aru-abu">
                                        {t('testimonials_form_subtitle')}
                                    </p>
                                </div>

                                {successMsg ? (
                                    <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl text-sm flex items-start gap-3">
                                        <span className="material-symbols-outlined text-green-600 flex-shrink-0 mt-0.5">check_circle</span>
                                        <span>{successMsg}</span>
                                    </div>
                                ) : (
                                    <form onSubmit={submit} className="space-y-4">
                                        {/* Type Selector */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                onClick={() => form.setData('type', 'corporate')}
                                                className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition-all ${
                                                    form.data.type === 'corporate'
                                                        ? 'border-aru-merah bg-aru-merah/5 text-aru-merah'
                                                        : 'border-surface-container-high hover:border-aru-biru-tua/20 text-aru-abu'
                                                }`}
                                            >
                                                {t('testimonials_form_type_corp')}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => form.setData('type', 'worker')}
                                                className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition-all ${
                                                    form.data.type === 'worker'
                                                        ? 'border-aru-merah bg-aru-merah/5 text-aru-merah'
                                                        : 'border-surface-container-high hover:border-aru-biru-tua/20 text-aru-abu'
                                                }`}
                                            >
                                                {t('testimonials_form_type_worker')}
                                            </button>
                                        </div>

                                        {/* Name input */}
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-wider text-aru-abu mb-1">
                                                {t('testimonials_form_name')} *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={form.data.name}
                                                onChange={e => form.setData('name', e.target.value)}
                                                className="w-full border border-surface-container-high rounded-lg px-3 py-2 text-sm focus:border-aru-merah outline-none"
                                            />
                                            {form.errors.name && <p className="text-error text-xs mt-1">{form.errors.name}</p>}
                                        </div>

                                        {/* Company / Position input */}
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-wider text-aru-abu mb-1">
                                                {t('testimonials_form_company')} *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={form.data.company_or_position}
                                                onChange={e => form.setData('company_or_position', e.target.value)}
                                                className="w-full border border-surface-container-high rounded-lg px-3 py-2 text-sm focus:border-aru-merah outline-none"
                                            />
                                            {form.errors.company_or_position && <p className="text-error text-xs mt-1">{form.errors.company_or_position}</p>}
                                        </div>

                                        {/* Rating Stars Selector */}
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-wider text-aru-abu mb-1">
                                                {t('testimonials_form_rating')}
                                            </label>
                                            <div className="flex gap-1.5 text-amber-500">
                                                {Array.from({ length: 5 }).map((_, i) => {
                                                    const starVal = i + 1;
                                                    const isFilled = starVal <= form.data.rating;
                                                    return (
                                                        <button
                                                            key={i}
                                                            type="button"
                                                            onClick={() => form.setData('rating', starVal)}
                                                            className="hover:scale-125 hover:text-amber-600 transition-all cursor-pointer p-0.5"
                                                        >
                                                            <span 
                                                                className="material-symbols-outlined text-3xl block"
                                                                style={{ fontVariationSettings: `"'FILL' ${isFilled ? 1 : 0}"` }}
                                                            >
                                                                star
                                                            </span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Testimonial Message Textarea */}
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-wider text-aru-abu mb-1">
                                                {t('testimonials_form_text')} *
                                            </label>
                                            <textarea
                                                required
                                                rows={4}
                                                maxLength={1000}
                                                value={form.data.testimonial}
                                                onChange={e => form.setData('testimonial', e.target.value)}
                                                className="w-full border border-surface-container-high rounded-lg px-3 py-2 text-sm focus:border-aru-merah outline-none resize-none"
                                            />
                                            {form.errors.testimonial && <p className="text-error text-xs mt-1">{form.errors.testimonial}</p>}
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex justify-end gap-3 pt-2">
                                            <button
                                                type="button"
                                                onClick={() => setModalOpen(false)}
                                                className="px-4 py-2 border border-surface-container-high text-aru-abu rounded-lg text-sm hover:bg-surface-container-low transition-colors"
                                            >
                                                {t('footer_links') === 'Quick Links' ? 'Cancel' : 'Batal'}
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={form.processing}
                                                className="px-6 py-2 bg-aru-merah text-aru-putih rounded-lg text-sm font-bold uppercase hover:bg-aru-merah/90 transition-colors disabled:opacity-50"
                                            >
                                                {form.processing ? t('testimonials_form_submitting') : t('testimonials_form_submit')}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
