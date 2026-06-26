import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ContactSubmission } from '@/types';

interface Props { submission: ContactSubmission; }

export default function ContactShow({ submission }: Props) {
    return (
        <AdminLayout title="Detail Pesan">
            <Head title="Detail Pesan" />

            <div className="max-w-3xl">
                <Link href="/admin/contacts" className="text-aru-merah hover:underline text-sm mb-4 inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-lg">arrow_back</span> Kembali
                </Link>

                <div className="bg-aru-putih rounded-lg p-8 mt-4">
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Nama</label>
                            <p className="text-aru-biru-tua font-semibold">{submission.name}</p>
                        </div>
                        <div>
                            <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Email</label>
                            <p className="text-aru-biru-tua">{submission.email}</p>
                        </div>
                        {submission.company && (
                            <div>
                                <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Perusahaan</label>
                                <p className="text-aru-biru-tua">{submission.company}</p>
                            </div>
                        )}
                        {submission.phone && (
                            <div>
                                <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Telepon</label>
                                <p className="text-aru-biru-tua">{submission.phone}</p>
                            </div>
                        )}
                    </div>

                    {submission.subject && (
                        <div className="mb-4">
                            <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Subjek</label>
                            <p className="text-aru-biru-tua font-semibold">{submission.subject}</p>
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block text-[11px] uppercase tracking-wide text-aru-abu mb-1">Pesan</label>
                        <p className="text-aru-biru-tua whitespace-pre-wrap bg-aru-biru-muda p-4 rounded">{submission.message}</p>
                    </div>

                    <div className="flex justify-between items-center text-sm text-aru-abu border-t border-surface-container-high pt-4">
                        <span>Diterima: {new Date(submission.created_at).toLocaleString('id-ID')}</span>
                        <button
                            onClick={() => { if (confirm('Hapus pesan ini?')) router.delete(`/admin/contacts/${submission.id}`); }}
                            className="text-error hover:underline"
                        >
                            Hapus Pesan
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
