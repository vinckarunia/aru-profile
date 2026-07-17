import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { LegalDocItem } from '@/types';
import { FormEvent, useState } from 'react';

interface Props { documents: LegalDocItem[]; }

export default function LegalIndex({ documents }: Props) {
    const [editId, setEditId] = useState<number | null>(null);
    const form = useForm({ name: '', name_en: '', number: '', issuer: '', issuer_en: '', issued_date: '', expiry_date: '' });
    const editForm = useForm({ name: '', name_en: '', number: '', issuer: '', issuer_en: '', issued_date: '', expiry_date: '', is_active: true });

    const handleCreate = (e: FormEvent) => { e.preventDefault(); form.post('/admin/legal', { onSuccess: () => form.reset() }); };
    
    const startEdit = (d: LegalDocItem) => {
        setEditId(d.id);
        editForm.setData({
            name: d.name,
            name_en: d.name_en || '',
            number: d.number || '',
            issuer: d.issuer || '',
            issuer_en: d.issuer_en || '',
            issued_date: d.issued_date ? d.issued_date.substring(0, 10) : '',
            expiry_date: d.expiry_date ? d.expiry_date.substring(0, 10) : '',
            is_active: d.is_active
        });
    };
    
    const handleUpdate = (e: FormEvent) => { e.preventDefault(); editForm.put(`/admin/legal/${editId}`, { onSuccess: () => setEditId(null) }); };

    return (
        <AdminLayout title="Legalitas">
            <Head title="Legalitas" />
            <form onSubmit={handleCreate} className="bg-aru-putih rounded-lg p-6 mb-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Nama Dokumen (ID) *</label>
                        <input type="text" value={form.data.name} onChange={e => form.setData('name', e.target.value)} className="w-full border border-surface-container-high rounded px-3 py-2 text-sm" required />
                    </div>
                    <div>
                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Nama Dokumen (EN)</label>
                        <input type="text" value={form.data.name_en} onChange={e => form.setData('name_en', e.target.value)} className="w-full border border-surface-container-high rounded px-3 py-2 text-sm" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Nomor</label>
                        <input type="text" value={form.data.number} onChange={e => form.setData('number', e.target.value)} className="w-full border border-surface-container-high rounded px-3 py-2 text-sm" />
                    </div>
                    <div>
                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Penerbit (ID)</label>
                        <input type="text" value={form.data.issuer} onChange={e => form.setData('issuer', e.target.value)} className="w-full border border-surface-container-high rounded px-3 py-2 text-sm" />
                    </div>
                    <div>
                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Penerbit (EN)</label>
                        <input type="text" value={form.data.issuer_en} onChange={e => form.setData('issuer_en', e.target.value)} className="w-full border border-surface-container-high rounded px-3 py-2 text-sm" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Tanggal Diterbitkan</label>
                        <input type="date" value={form.data.issued_date} onChange={e => form.setData('issued_date', e.target.value)} className="w-full border border-surface-container-high rounded px-3 py-2 text-sm" />
                    </div>
                    <div>
                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Tanggal Kadaluarsa / Habis Berlaku</label>
                        <input type="date" value={form.data.expiry_date} onChange={e => form.setData('expiry_date', e.target.value)} className="w-full border border-surface-container-high rounded px-3 py-2 text-sm" />
                    </div>
                </div>
                <button type="submit" disabled={form.processing} className="bg-aru-merah text-aru-putih px-6 py-2 rounded text-sm font-semibold">Tambah Dokumen</button>
            </form>

            <div className="space-y-4">
                {documents.map(d => (
                    <div key={d.id} className="bg-aru-putih rounded-lg p-6 border-l-4 border-aru-emas">
                        {editId === d.id ? (
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Nama Dokumen (ID)</label>
                                        <input type="text" value={editForm.data.name} onChange={e => editForm.setData('name', e.target.value)} className="border rounded px-3 py-2 text-sm w-full" required />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Nama Dokumen (EN)</label>
                                        <input type="text" value={editForm.data.name_en} onChange={e => editForm.setData('name_en', e.target.value)} className="border rounded px-3 py-2 text-sm w-full" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Nomor</label>
                                        <input type="text" value={editForm.data.number} onChange={e => editForm.setData('number', e.target.value)} className="border rounded px-3 py-2 text-sm w-full" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Penerbit (ID)</label>
                                        <input type="text" value={editForm.data.issuer} onChange={e => editForm.setData('issuer', e.target.value)} className="border rounded px-3 py-2 text-sm w-full" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Penerbit (EN)</label>
                                        <input type="text" value={editForm.data.issuer_en} onChange={e => editForm.setData('issuer_en', e.target.value)} className="border rounded px-3 py-2 text-sm w-full" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Tanggal Diterbitkan</label>
                                        <input type="date" value={editForm.data.issued_date} onChange={e => editForm.setData('issued_date', e.target.value)} className="border rounded px-3 py-2 text-sm w-full" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Tanggal Kadaluarsa</label>
                                        <input type="date" value={editForm.data.expiry_date} onChange={e => editForm.setData('expiry_date', e.target.value)} className="border rounded px-3 py-2 text-sm w-full" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Status</label>
                                        <select value={editForm.data.is_active ? '1' : '0'} onChange={e => editForm.setData('is_active', e.target.value === '1')} className="border rounded px-3 py-2 text-sm w-full">
                                            <option value="1">Aktif</option>
                                            <option value="0">Nonaktif</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button type="submit" className="bg-green-600 text-white px-4 py-1.5 rounded text-sm font-semibold">Simpan</button>
                                    <button type="button" onClick={() => setEditId(null)} className="text-aru-abu text-sm">Batal</button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-aru-emas filled">verified</span>
                                        <h3 className="font-semibold text-aru-biru-tua">{d.name} <span className="text-xs font-normal text-aru-abu">/ {d.name_en || '-'}</span></h3>
                                    </div>
                                    {d.number && <p className="text-sm text-aru-abu mt-1 font-mono">No. {d.number}</p>}
                                    {d.issuer && <p className="text-sm text-aru-abu">Penerbit: {d.issuer} {d.issuer_en && <span className="text-xs text-aru-abu/70">/ {d.issuer_en}</span>}</p>}
                                    {d.issued_date && (
                                        <p className="text-xs text-aru-abu mt-1">
                                            Diterbitkan: {new Date(d.issued_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                    )}
                                    {d.expiry_date && (
                                        <p className="text-xs text-aru-abu">
                                            Berlaku hingga: {new Date(d.expiry_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                    )}
                                    <span className={`text-xs px-2 py-0.5 rounded-full mt-2 inline-block ${d.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {d.is_active ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => startEdit(d)} className="text-aru-merah hover:underline text-sm">Edit</button>
                                    <button onClick={() => { if (confirm('Hapus?')) router.delete(`/admin/legal/${d.id}`); }} className="text-error hover:underline text-sm">Hapus</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
