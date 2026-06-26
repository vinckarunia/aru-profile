import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ContactSubmission } from '@/types';

interface PaginatedData {
    data: ContactSubmission[];
    current_page: number;
    last_page: number;
    total: number;
}

interface Props { submissions: PaginatedData; }

export default function ContactsIndex({ submissions }: Props) {
    return (
        <AdminLayout title="Pesan Masuk">
            <Head title="Pesan Masuk" />
            <p className="text-sm text-aru-abu mb-4">Total: {submissions.total} pesan</p>

            <div className="bg-aru-putih rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-aru-biru-muda">
                        <tr>
                            <th className="text-left px-4 py-3 font-semibold text-aru-biru-tua">Nama</th>
                            <th className="text-left px-4 py-3 font-semibold text-aru-biru-tua">Email</th>
                            <th className="text-left px-4 py-3 font-semibold text-aru-biru-tua">Subjek</th>
                            <th className="text-left px-4 py-3 font-semibold text-aru-biru-tua">Tanggal</th>
                            <th className="text-left px-4 py-3 font-semibold text-aru-biru-tua">Status</th>
                            <th className="text-right px-4 py-3 font-semibold text-aru-biru-tua">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.data.map(s => (
                            <tr key={s.id} className={`border-t border-surface-container-high ${!s.is_read ? 'bg-aru-biru-muda/30 font-semibold' : ''}`}>
                                <td className="px-4 py-3">{s.name}</td>
                                <td className="px-4 py-3 text-aru-abu">{s.email}</td>
                                <td className="px-4 py-3 text-aru-abu">{s.subject || '-'}</td>
                                <td className="px-4 py-3 text-aru-abu">{new Date(s.created_at).toLocaleDateString('id-ID')}</td>
                                <td className="px-4 py-3">
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${s.is_read ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {s.is_read ? 'Dibaca' : 'Baru'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right space-x-2">
                                    <Link href={`/admin/contacts/${s.id}`} className="text-aru-merah hover:underline">Lihat</Link>
                                    <button onClick={() => { if (confirm('Hapus?')) router.delete(`/admin/contacts/${s.id}`); }} className="text-error hover:underline">Hapus</button>
                                </td>
                            </tr>
                        ))}
                        {submissions.data.length === 0 && (
                            <tr><td colSpan={6} className="px-4 py-8 text-center text-aru-abu">Belum ada pesan masuk.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {submissions.last_page > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: submissions.last_page }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => router.get(`/admin/contacts?page=${page}`)}
                            className={`px-3 py-1 rounded text-sm ${page === submissions.current_page ? 'bg-aru-merah text-white' : 'bg-aru-biru-muda text-aru-biru-tua hover:bg-aru-biru-tua hover:text-white'}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
