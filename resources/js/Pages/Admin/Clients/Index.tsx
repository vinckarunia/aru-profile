import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ImageUploader from '@/Components/Admin/ImageUploader';
import { ClientItem } from '@/types';
import { FormEvent, useState } from 'react';

interface Props { clients: ClientItem[]; }

export default function ClientsIndex({ clients }: Props) {
    const [editId, setEditId] = useState<number | null>(null);
    const form = useForm({ name: '', logo: '', website_url: '' });
    const editForm = useForm({ name: '', logo: '', website_url: '', is_active: true });

    const handleCreate = (e: FormEvent) => { e.preventDefault(); form.post('/admin/clients', { onSuccess: () => form.reset() }); };
    const startEdit = (c: ClientItem) => { setEditId(c.id); editForm.setData({ name: c.name, logo: c.logo || '', website_url: c.website_url || '', is_active: c.is_active }); };
    const handleUpdate = (e: FormEvent) => { e.preventDefault(); editForm.put(`/admin/clients/${editId}`, { onSuccess: () => setEditId(null) }); };

    return (
        <AdminLayout title="Klien">
            <Head title="Klien" />
            <form onSubmit={handleCreate} className="bg-aru-putih rounded-lg p-6 mb-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Nama Klien *</label>
                        <input type="text" value={form.data.name} onChange={e => form.setData('name', e.target.value)} className="w-full border border-surface-container-high rounded px-3 py-2 text-sm" />
                    </div>
                    <div>
                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Website URL</label>
                        <input type="text" value={form.data.website_url} onChange={e => form.setData('website_url', e.target.value)} className="w-full border border-surface-container-high rounded px-3 py-2 text-sm" />
                    </div>
                </div>
                <div>
                    <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Logo</label>
                    <ImageUploader currentUrl={null} onUploaded={(path) => form.setData('logo', path)} />
                </div>
                <button type="submit" disabled={form.processing} className="bg-aru-merah text-aru-putih px-6 py-2 rounded text-sm font-semibold">Tambah Klien</button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clients.map(c => (
                    <div key={c.id} className="bg-aru-putih rounded-lg p-6 border border-surface-container-high">
                        {editId === c.id ? (
                            <form onSubmit={handleUpdate} className="space-y-3">
                                <input type="text" value={editForm.data.name} onChange={e => editForm.setData('name', e.target.value)} className="w-full border rounded px-3 py-2 text-sm" />
                                <input type="text" value={editForm.data.website_url} onChange={e => editForm.setData('website_url', e.target.value)} className="w-full border rounded px-3 py-2 text-sm" placeholder="Website URL" />
                                <ImageUploader currentUrl={c.logo_url} onUploaded={(path) => editForm.setData('logo', path)} />
                                <div className="flex gap-2">
                                    <button type="submit" className="bg-green-600 text-white px-4 py-1.5 rounded text-sm">Simpan</button>
                                    <button type="button" onClick={() => setEditId(null)} className="text-aru-abu text-sm">Batal</button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {c.logo_url ? (
                                        <img src={c.logo_url} alt={c.name} className="h-12 w-auto object-contain" />
                                    ) : (
                                        <span className="material-symbols-outlined text-aru-abu text-3xl">business</span>
                                    )}
                                    <div>
                                        <h3 className="font-semibold text-aru-biru-tua">{c.name}</h3>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${c.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {c.is_active ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => startEdit(c)} className="text-aru-merah hover:underline text-sm">Edit</button>
                                    <button onClick={() => { if (confirm('Hapus?')) router.delete(`/admin/clients/${c.id}`); }} className="text-error hover:underline text-sm">Hapus</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
