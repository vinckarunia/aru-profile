import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ImageUploader from '@/Components/Admin/ImageUploader';
import { FormEvent, useState, useEffect } from 'react';

interface TestimonialItem {
    id: number;
    name: string;
    company_or_position: string;
    type: 'corporate' | 'worker';
    testimonial: string;
    rating: number;
    avatar: string | null;
    avatar_url: string | null;
    is_active: boolean;
    sort_order: number;
}

interface Props {
    testimonials: TestimonialItem[];
}

export default function TestimonialsIndex({ testimonials }: Props) {
    const [editId, setEditId] = useState<number | null>(null);
    const [localTestimonials, setLocalTestimonials] = useState<TestimonialItem[]>(testimonials);

    useEffect(() => {
        setLocalTestimonials(testimonials);
    }, [testimonials]);

    const form = useForm({
        name: '',
        company_or_position: '',
        type: 'corporate' as 'corporate' | 'worker',
        rating: 5,
        testimonial: '',
        avatar: '',
        is_active: true
    });

    const editForm = useForm({
        name: '',
        company_or_position: '',
        type: 'corporate' as 'corporate' | 'worker',
        rating: 5,
        testimonial: '',
        avatar: '',
        is_active: true
    });

    const handleCreate = (e: FormEvent) => {
        e.preventDefault();
        form.post('/admin/testimonials', {
            onSuccess: () => form.reset()
        });
    };

    const startEdit = (t: TestimonialItem) => {
        setEditId(t.id);
        editForm.setData({
            name: t.name,
            company_or_position: t.company_or_position,
            type: t.type,
            rating: t.rating,
            testimonial: t.testimonial,
            avatar: t.avatar || '',
            is_active: t.is_active
        });
    };

    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();
        editForm.put(`/admin/testimonials/${editId}`, {
            onSuccess: () => setEditId(null)
        });
    };

    const moveItem = (index: number, direction: 'up' | 'down') => {
        const newItems = [...localTestimonials];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newItems.length) return;

        // Swap items
        const temp = newItems[index];
        newItems[index] = newItems[targetIndex];
        newItems[targetIndex] = temp;

        setLocalTestimonials(newItems);

        // Save order to backend
        router.post('/admin/testimonials/reorder', {
            ids: newItems.map(item => item.id)
        }, {
            preserveScroll: true
        });
    };

    return (
        <AdminLayout title="Testimoni &amp; Ulasan">
            <Head title="Testimoni &amp; Ulasan" />

            {/* Create Form */}
            <form onSubmit={handleCreate} className="bg-aru-putih rounded-lg p-6 mb-6 space-y-4 border border-surface-container-high">
                <h3 className="font-semibold text-lg text-aru-biru-tua pb-2 border-b border-surface-container-high">
                    Tambah Testimoni Baru
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Nama Klien / Pekerja *</label>
                        <input
                            type="text"
                            required
                            value={form.data.name}
                            onChange={e => form.setData('name', e.target.value)}
                            className="w-full border border-surface-container-high rounded px-3 py-2 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Jabatan / Perusahaan *</label>
                        <input
                            type="text"
                            required
                            value={form.data.company_or_position}
                            onChange={e => form.setData('company_or_position', e.target.value)}
                            className="w-full border border-surface-container-high rounded px-3 py-2 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Tipe Testimoni *</label>
                        <select
                            value={form.data.type}
                            onChange={e => form.setData('type', e.target.value as any)}
                            className="w-full border border-surface-container-high rounded px-3 py-2 text-sm bg-white"
                        >
                            <option value="corporate">Badan Usaha (Klien)</option>
                            <option value="worker">Pekerja (Mitra)</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Ulasan / Testimoni *</label>
                        <textarea
                            required
                            rows={3}
                            value={form.data.testimonial}
                            onChange={e => form.setData('testimonial', e.target.value)}
                            className="w-full border border-surface-container-high rounded px-3 py-2 text-sm resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Rating Penilaian (1-5) *</label>
                        <select
                            value={form.data.rating}
                            onChange={e => form.setData('rating', parseInt(e.target.value))}
                            className="w-full border border-surface-container-high rounded px-3 py-2 text-sm bg-white"
                        >
                            <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                            <option value={4}>⭐⭐⭐⭐ (4)</option>
                            <option value={3}>⭐⭐⭐ (3)</option>
                            <option value={2}>⭐⭐ (2)</option>
                            <option value={1}>⭐ (1)</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Foto Profil / Avatar</label>
                    <ImageUploader currentUrl={null} onUploaded={(path) => form.setData('avatar', path)} />
                </div>

                <button
                    type="submit"
                    disabled={form.processing}
                    className="bg-aru-merah text-aru-putih px-6 py-2 rounded text-sm font-semibold hover:bg-aru-merah/95 transition-colors disabled:opacity-50"
                >
                    Tambah Testimoni
                </button>
            </form>

            {/* Testimonials List */}
            <div className="space-y-4">
                {localTestimonials.map((t, index) => (
                    <div key={t.id} className="bg-aru-putih rounded-lg p-6 border border-surface-container-high shadow-sm flex items-start gap-4">
                        {/* Sort actions */}
                        <div className="flex flex-col gap-1 items-center justify-center pt-2">
                            <button
                                onClick={() => moveItem(index, 'up')}
                                disabled={index === 0}
                                className="p-1 hover:bg-surface-container-low rounded text-aru-abu disabled:opacity-30 cursor-pointer"
                                title="Naikkan"
                            >
                                <span className="material-symbols-outlined text-xl">keyboard_arrow_up</span>
                            </button>
                            <span className="text-xs font-bold text-aru-abu/50 select-none">
                                {t.sort_order}
                            </span>
                            <button
                                onClick={() => moveItem(index, 'down')}
                                disabled={index === localTestimonials.length - 1}
                                className="p-1 hover:bg-surface-container-low rounded text-aru-abu disabled:opacity-30 cursor-pointer"
                                title="Turunkan"
                            >
                                <span className="material-symbols-outlined text-xl">keyboard_arrow_down</span>
                            </button>
                        </div>

                        {/* Detail / Edit form */}
                        <div className="flex-1">
                            {editId === t.id ? (
                                <form onSubmit={handleUpdate} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <input
                                            type="text"
                                            required
                                            value={editForm.data.name}
                                            onChange={e => editForm.setData('name', e.target.value)}
                                            className="w-full border rounded px-3 py-2 text-sm"
                                            placeholder="Nama"
                                        />
                                        <input
                                            type="text"
                                            required
                                            value={editForm.data.company_or_position}
                                            onChange={e => editForm.setData('company_or_position', e.target.value)}
                                            className="w-full border rounded px-3 py-2 text-sm"
                                            placeholder="Jabatan"
                                        />
                                        <select
                                            value={editForm.data.type}
                                            onChange={e => editForm.setData('type', e.target.value as any)}
                                            className="w-full border rounded px-3 py-2 text-sm bg-white"
                                        >
                                            <option value="corporate">Badan Usaha (Klien)</option>
                                            <option value="worker">Pekerja (Mitra)</option>
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <textarea
                                            required
                                            rows={2}
                                            value={editForm.data.testimonial}
                                            onChange={e => editForm.setData('testimonial', e.target.value)}
                                            className="w-full border rounded px-3 py-2 text-sm md:col-span-2 resize-none"
                                            placeholder="Ulasan"
                                        />
                                        <select
                                            value={editForm.data.rating}
                                            onChange={e => editForm.setData('rating', parseInt(e.target.value))}
                                            className="w-full border rounded px-3 py-2 text-sm bg-white"
                                        >
                                            <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                                            <option value={4}>⭐⭐⭐⭐ (4)</option>
                                            <option value={3}>⭐⭐⭐ (3)</option>
                                            <option value={2}>⭐⭐ (2)</option>
                                            <option value={1}>⭐ (1)</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id={`is_active_${t.id}`}
                                            checked={editForm.data.is_active}
                                            onChange={e => editForm.setData('is_active', e.target.checked)}
                                        />
                                        <label htmlFor={`is_active_${t.id}`} className="text-sm text-aru-abu font-semibold">
                                            Tampilkan di Website (Disetujui)
                                        </label>
                                    </div>
                                    <ImageUploader currentUrl={t.avatar_url} onUploaded={(path) => editForm.setData('avatar', path)} />
                                    <div className="flex gap-2">
                                        <button type="submit" className="bg-green-600 text-white px-5 py-1.5 rounded text-sm font-semibold">
                                            Simpan
                                        </button>
                                        <button type="button" onClick={() => setEditId(null)} className="text-aru-abu text-sm font-semibold hover:underline">
                                            Batal
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        {t.avatar_url ? (
                                            <img
                                                src={t.avatar_url}
                                                alt={t.name}
                                                className="w-12 h-12 rounded-full object-cover border border-surface-container-high"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-aru-biru-muda text-aru-biru-tua flex items-center justify-center font-bold">
                                                {t.name.charAt(0)}
                                            </div>
                                        )}
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-aru-biru-tua">{t.name}</h4>
                                                <span className="text-xs text-aru-abu font-medium">({t.company_or_position})</span>
                                            </div>
                                            <div className="flex gap-1 text-amber-500 text-xs">
                                                {'⭐'.repeat(t.rating)}
                                            </div>
                                            <p className="text-sm text-aru-abu italic leading-relaxed pt-1">
                                                &ldquo;{t.testimonial}&rdquo;
                                            </p>
                                            <div className="flex gap-2 pt-2">
                                                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                                    t.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                    {t.is_active ? 'Disetujui' : 'Butuh Moderasi / Disembunyikan'}
                                                </span>
                                                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                                    t.type === 'corporate' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                                                }`}>
                                                    {t.type === 'corporate' ? 'Badan Usaha' : 'Pekerja'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => startEdit(t)}
                                            className="text-aru-merah hover:underline text-sm font-semibold"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (confirm('Hapus testimoni ini?')) {
                                                    router.delete(`/admin/testimonials/${t.id}`);
                                                }
                                            }}
                                            className="text-error hover:underline text-sm font-semibold"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {localTestimonials.length === 0 && (
                    <div className="text-center py-16 bg-aru-putih rounded-lg border border-dashed border-surface-container-high">
                        <span className="material-symbols-outlined text-aru-abu/40 text-4xl mb-2">rate_review</span>
                        <p className="text-aru-abu text-sm">Belum ada testimoni terdaftar.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
