import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ServiceItem } from '@/types';
import { FormEvent, useState } from 'react';

interface Props { services: ServiceItem[]; }

export default function ServicesIndex({ services }: Props) {
    const [editId, setEditId] = useState<number | null>(null);
    const form = useForm({ icon: '', title: '', title_en: '', description: '', description_en: '' });
    const editForm = useForm({ icon: '', title: '', title_en: '', description: '', description_en: '', is_active: true });

    const handleCreate = (e: FormEvent) => { e.preventDefault(); form.post('/admin/services', { onSuccess: () => form.reset() }); };

    const startEdit = (s: ServiceItem) => {
        setEditId(s.id);
        editForm.setData({
            icon: s.icon || '',
            title: s.title,
            title_en: s.title_en || '',
            description: s.description || '',
            description_en: s.description_en || '',
            is_active: s.is_active
        });
    };

    const handleUpdate = (e: FormEvent) => { e.preventDefault(); editForm.put(`/admin/services/${editId}`, { onSuccess: () => setEditId(null) }); };

    return (
        <AdminLayout title="Layanan">
            <Head title="Layanan" />
            <form onSubmit={handleCreate} className="bg-aru-putih rounded-lg p-6 mb-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Icon (Material Symbol)</label>
                        <input type="text" value={form.data.icon} onChange={e => form.setData('icon', e.target.value)} className="w-full border border-surface-container-high rounded px-3 py-2 text-sm" placeholder="groups" />
                    </div>
                    <div>
                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Judul (ID) *</label>
                        <input type="text" value={form.data.title} onChange={e => form.setData('title', e.target.value)} className="w-full border border-surface-container-high rounded px-3 py-2 text-sm" required />
                    </div>
                    <div>
                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Judul (EN)</label>
                        <input type="text" value={form.data.title_en} onChange={e => form.setData('title_en', e.target.value)} className="w-full border border-surface-container-high rounded px-3 py-2 text-sm" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Deskripsi (ID)</label>
                        <textarea value={form.data.description} onChange={e => form.setData('description', e.target.value)} className="w-full border border-surface-container-high rounded px-3 py-2 text-sm" rows={2} />
                    </div>
                    <div>
                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Deskripsi (EN)</label>
                        <textarea value={form.data.description_en} onChange={e => form.setData('description_en', e.target.value)} className="w-full border border-surface-container-high rounded px-3 py-2 text-sm" rows={2} />
                    </div>
                </div>
                <button type="submit" disabled={form.processing} className="bg-aru-merah text-aru-putih px-6 py-2 rounded text-sm font-semibold">Tambah Layanan</button>
            </form>

            <div className="space-y-4">
                {services.map(s => (
                    <div key={s.id} className="bg-aru-putih rounded-lg p-6 border border-surface-container-high">
                        {editId === s.id ? (
                            <form onSubmit={handleUpdate} className="space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-[10px] uppercase text-aru-abu mb-1">Icon</label>
                                        <input type="text" value={editForm.data.icon} onChange={e => editForm.setData('icon', e.target.value)} className="border rounded px-3 py-1.5 text-sm w-full" placeholder="Icon" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase text-aru-abu mb-1">Judul (ID)</label>
                                        <input type="text" value={editForm.data.title} onChange={e => editForm.setData('title', e.target.value)} className="border rounded px-3 py-1.5 text-sm w-full" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase text-aru-abu mb-1">Judul (EN)</label>
                                        <input type="text" value={editForm.data.title_en} onChange={e => editForm.setData('title_en', e.target.value)} className="border rounded px-3 py-1.5 text-sm w-full" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase text-aru-abu mb-1">Status</label>
                                        <select value={editForm.data.is_active ? '1' : '0'} onChange={e => editForm.setData('is_active', e.target.value === '1')} className="border rounded px-3 py-1.5 text-sm w-full">
                                            <option value="1">Aktif</option><option value="0">Nonaktif</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] uppercase text-aru-abu mb-1">Deskripsi (ID)</label>
                                        <textarea value={editForm.data.description} onChange={e => editForm.setData('description', e.target.value)} className="w-full border rounded px-3 py-1.5 text-sm" rows={2} />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase text-aru-abu mb-1">Deskripsi (EN)</label>
                                        <textarea value={editForm.data.description_en} onChange={e => editForm.setData('description_en', e.target.value)} className="w-full border rounded px-3 py-1.5 text-sm" rows={2} />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button type="submit" className="bg-green-600 text-white px-4 py-1.5 rounded text-sm font-semibold">Simpan</button>
                                    <button type="button" onClick={() => setEditId(null)} className="text-aru-abu text-sm">Batal</button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                    {s.icon && <span className="material-symbols-outlined text-aru-merah text-3xl">{s.icon}</span>}
                                    <div>
                                        <h3 className="font-semibold text-aru-biru-tua">{s.title} <span className="text-xs font-normal text-aru-abu">/ {s.title_en || '-'}</span></h3>
                                        <p className="text-sm text-aru-abu mt-1">{s.description}</p>
                                        {s.description_en && <p className="text-xs text-aru-abu/70 italic mt-0.5">EN: {s.description_en}</p>}
                                        <span className={`text-xs px-2 py-0.5 rounded-full mt-2 inline-block ${s.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {s.is_active ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => startEdit(s)} className="text-aru-merah hover:underline text-sm">Edit</button>
                                    <button onClick={() => { if (confirm('Hapus?')) router.delete(`/admin/services/${s.id}`); }} className="text-error hover:underline text-sm">Hapus</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
