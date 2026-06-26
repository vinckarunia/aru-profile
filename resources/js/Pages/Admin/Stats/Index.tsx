import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { StatItem } from '@/types';
import { FormEvent, useState } from 'react';

interface Props { stats: StatItem[]; }

export default function StatsIndex({ stats }: Props) {
    const [editId, setEditId] = useState<number | null>(null);
    const form = useForm({ value: '', label: '' });
    const editForm = useForm({ value: '', label: '', is_active: true });

    const handleCreate = (e: FormEvent) => {
        e.preventDefault();
        form.post('/admin/stats', { onSuccess: () => form.reset() });
    };

    const startEdit = (s: StatItem) => {
        setEditId(s.id);
        editForm.setData({ value: s.value, label: s.label, is_active: s.is_active });
    };

    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();
        editForm.put(`/admin/stats/${editId}`, { onSuccess: () => setEditId(null) });
    };

    return (
        <AdminLayout title="Statistik Hero">
            <Head title="Statistik" />

            {/* Create form */}
            <form onSubmit={handleCreate} className="bg-aru-putih rounded-lg p-6 mb-6 flex gap-4 items-end flex-wrap">
                <div className="flex-1 min-w-[120px]">
                    <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Nilai</label>
                    <input type="text" value={form.data.value} onChange={e => form.setData('value', e.target.value)} className="w-full border border-surface-container-high rounded px-3 py-2 text-sm" placeholder="20+" />
                </div>
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Label</label>
                    <input type="text" value={form.data.label} onChange={e => form.setData('label', e.target.value)} className="w-full border border-surface-container-high rounded px-3 py-2 text-sm" placeholder="Tahun Pengalaman" />
                </div>
                <button type="submit" disabled={form.processing} className="bg-aru-merah text-aru-putih px-6 py-2 rounded text-sm font-semibold">Tambah</button>
            </form>

            {/* List */}
            <div className="bg-aru-putih rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-aru-biru-muda">
                        <tr>
                            <th className="text-left px-4 py-3 font-semibold text-aru-biru-tua">Nilai</th>
                            <th className="text-left px-4 py-3 font-semibold text-aru-biru-tua">Label</th>
                            <th className="text-left px-4 py-3 font-semibold text-aru-biru-tua">Status</th>
                            <th className="text-right px-4 py-3 font-semibold text-aru-biru-tua">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map(s => (
                            <tr key={s.id} className="border-t border-surface-container-high">
                                {editId === s.id ? (
                                    <>
                                        <td className="px-4 py-3"><input type="text" value={editForm.data.value} onChange={e => editForm.setData('value', e.target.value)} className="border rounded px-2 py-1 text-sm w-full" /></td>
                                        <td className="px-4 py-3"><input type="text" value={editForm.data.label} onChange={e => editForm.setData('label', e.target.value)} className="border rounded px-2 py-1 text-sm w-full" /></td>
                                        <td className="px-4 py-3">
                                            <select value={editForm.data.is_active ? '1' : '0'} onChange={e => editForm.setData('is_active', e.target.value === '1')} className="border rounded px-2 py-1 text-sm">
                                                <option value="1">Aktif</option>
                                                <option value="0">Nonaktif</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3 text-right space-x-2">
                                            <button onClick={handleUpdate} className="text-green-600 hover:underline text-sm">Simpan</button>
                                            <button onClick={() => setEditId(null)} className="text-aru-abu hover:underline text-sm">Batal</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="px-4 py-3 font-semibold text-aru-biru-tua">{s.value}</td>
                                        <td className="px-4 py-3 text-aru-abu">{s.label}</td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs px-2 py-1 rounded-full ${s.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {s.is_active ? 'Aktif' : 'Nonaktif'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right space-x-2">
                                            <button onClick={() => startEdit(s)} className="text-aru-merah hover:underline text-sm">Edit</button>
                                            <button onClick={() => { if (confirm('Hapus?')) router.delete(`/admin/stats/${s.id}`); }} className="text-error hover:underline text-sm">Hapus</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
