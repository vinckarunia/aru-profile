import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ImageUploader from '@/Components/Admin/ImageUploader';
import { GalleryItem } from '@/types';
import { FormEvent, useState } from 'react';

interface Props { items: GalleryItem[]; }

export default function GalleryIndex({ items }: Props) {
    const [editId, setEditId] = useState<number | null>(null);
    const form = useForm({ title: '', description: '', image: '' });
    const editForm = useForm({ title: '', description: '', image: '', is_active: true });

    const handleCreate = (e: FormEvent) => { e.preventDefault(); form.post('/admin/gallery', { onSuccess: () => form.reset() }); };
    const startEdit = (g: GalleryItem) => { setEditId(g.id); editForm.setData({ title: g.title || '', description: g.description || '', image: g.image || '', is_active: g.is_active }); };
    const handleUpdate = (e: FormEvent) => { e.preventDefault(); editForm.put(`/admin/gallery/${editId}`, { onSuccess: () => setEditId(null) }); };

    return (
        <AdminLayout title="Galeri">
            <Head title="Galeri" />
            <form onSubmit={handleCreate} className="bg-aru-putih rounded-lg p-6 mb-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Judul</label><input type="text" value={form.data.title} onChange={e => form.setData('title', e.target.value)} className="w-full border border-surface-container-high rounded px-3 py-2 text-sm" /></div>
                    <div><label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Deskripsi</label><input type="text" value={form.data.description} onChange={e => form.setData('description', e.target.value)} className="w-full border border-surface-container-high rounded px-3 py-2 text-sm" /></div>
                </div>
                <div><label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Gambar</label><ImageUploader currentUrl={null} onUploaded={(path) => form.setData('image', path)} /></div>
                <button type="submit" disabled={form.processing} className="bg-aru-merah text-aru-putih px-6 py-2 rounded text-sm font-semibold">Tambah ke Galeri</button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map(g => (
                    <div key={g.id} className="bg-aru-putih rounded-lg overflow-hidden border border-surface-container-high p-4 flex flex-col justify-between">
                        {editId === g.id ? (
                            <form onSubmit={handleUpdate} className="space-y-3">
                                <div>
                                    <label className="block text-[10px] uppercase text-aru-abu mb-1">Judul</label>
                                    <input
                                        type="text"
                                        value={editForm.data.title}
                                        onChange={e => editForm.setData('title', e.target.value)}
                                        className="w-full border rounded px-2 py-1 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase text-aru-abu mb-1">Deskripsi</label>
                                    <input
                                        type="text"
                                        value={editForm.data.description}
                                        onChange={e => editForm.setData('description', e.target.value)}
                                        className="w-full border rounded px-2 py-1 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase text-aru-abu mb-1">Gambar</label>
                                    <ImageUploader currentUrl={g.image_url} onUploaded={(path) => editForm.setData('image', path)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase text-aru-abu mb-1">Status</label>
                                    <select
                                        value={editForm.data.is_active ? '1' : '0'}
                                        onChange={e => editForm.setData('is_active', e.target.value === '1')}
                                        className="w-full border rounded px-2 py-1 text-sm"
                                    >
                                        <option value="1">Aktif</option>
                                        <option value="0">Nonaktif</option>
                                    </select>
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold">Simpan</button>
                                    <button type="button" onClick={() => setEditId(null)} className="text-aru-abu hover:underline text-xs">Batal</button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <div>
                                    {g.image_url ? (
                                        <img src={g.image_url} alt={g.title || ''} className="w-full h-40 object-cover rounded mb-3" />
                                    ) : (
                                        <div className="w-full h-40 bg-aru-biru-muda flex items-center justify-center rounded mb-3">
                                            <span className="material-symbols-outlined text-aru-abu/30 text-4xl">photo_camera</span>
                                        </div>
                                    )}
                                    {g.title && <h3 className="font-semibold text-sm text-aru-biru-tua">{g.title}</h3>}
                                    {g.description && <p className="text-xs text-aru-abu mt-1">{g.description}</p>}
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full mt-2 inline-block ${g.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {g.is_active ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                </div>
                                <div className="flex gap-2 mt-4 pt-3 border-t border-surface-container-high">
                                    <button onClick={() => startEdit(g)} className="text-aru-merah hover:underline text-xs">Edit</button>
                                    <button onClick={() => { if (confirm('Hapus?')) router.delete(`/admin/gallery/${g.id}`); }} className="text-error hover:underline text-xs">Hapus</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
