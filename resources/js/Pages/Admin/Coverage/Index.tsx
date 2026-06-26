import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { CityItem } from '@/types';
import { FormEvent, useState } from 'react';

interface Props { cities: CityItem[]; }

export default function CoverageIndex({ cities }: Props) {
    const [editId, setEditId] = useState<number | null>(null);
    const form = useForm({ city_name: '', province: '' });
    const editForm = useForm({ city_name: '', province: '', is_active: true });

    const handleCreate = (e: FormEvent) => { e.preventDefault(); form.post('/admin/coverage', { onSuccess: () => form.reset() }); };
    const startEdit = (c: CityItem) => { setEditId(c.id); editForm.setData({ city_name: c.city_name, province: c.province || '', is_active: c.is_active }); };
    const handleUpdate = (e: FormEvent) => { e.preventDefault(); editForm.put(`/admin/coverage/${editId}`, { onSuccess: () => setEditId(null) }); };

    // Group by province for display
    const grouped = cities.reduce<Record<string, CityItem[]>>((acc, c) => {
        const p = c.province || 'Lainnya';
        if (!acc[p]) acc[p] = [];
        acc[p].push(c);
        return acc;
    }, {});

    return (
        <AdminLayout title="Jangkauan Kota">
            <Head title="Jangkauan" />
            <form onSubmit={handleCreate} className="bg-aru-putih rounded-lg p-6 mb-6 flex gap-4 items-end flex-wrap">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Nama Kota *</label>
                    <input type="text" value={form.data.city_name} onChange={e => form.setData('city_name', e.target.value)} className="w-full border border-surface-container-high rounded px-3 py-2 text-sm" />
                </div>
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Provinsi</label>
                    <input type="text" value={form.data.province} onChange={e => form.setData('province', e.target.value)} className="w-full border border-surface-container-high rounded px-3 py-2 text-sm" />
                </div>
                <button type="submit" disabled={form.processing} className="bg-aru-merah text-aru-putih px-6 py-2 rounded text-sm font-semibold">Tambah</button>
            </form>

            {Object.entries(grouped).map(([province, provinceCities]) => (
                <div key={province} className="mb-6">
                    <h3 className="font-heading font-bold text-lg text-aru-biru-tua mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-aru-merah">location_on</span>
                        {province}
                    </h3>
                    <div className="bg-aru-putih rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                            <tbody>
                                {provinceCities.map(c => (
                                    <tr key={c.id} className="border-t border-surface-container-high">
                                        {editId === c.id ? (
                                            <>
                                                <td className="px-4 py-3"><input type="text" value={editForm.data.city_name} onChange={e => editForm.setData('city_name', e.target.value)} className="border rounded px-2 py-1 text-sm w-full" /></td>
                                                <td className="px-4 py-3"><input type="text" value={editForm.data.province} onChange={e => editForm.setData('province', e.target.value)} className="border rounded px-2 py-1 text-sm w-full" /></td>
                                                <td className="px-4 py-3 text-right space-x-2">
                                                    <button onClick={handleUpdate} className="text-green-600 hover:underline text-sm">Simpan</button>
                                                    <button onClick={() => setEditId(null)} className="text-aru-abu hover:underline text-sm">Batal</button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-4 py-3">{c.city_name}</td>
                                                <td className="px-4 py-3 text-aru-abu">{c.province}</td>
                                                <td className="px-4 py-3 text-right space-x-2">
                                                    <button onClick={() => startEdit(c)} className="text-aru-merah hover:underline text-sm">Edit</button>
                                                    <button onClick={() => { if (confirm('Hapus?')) router.delete(`/admin/coverage/${c.id}`); }} className="text-error hover:underline text-sm">Hapus</button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </AdminLayout>
    );
}
