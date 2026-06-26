import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ImageUploader from '@/Components/Admin/ImageUploader';
import { FormEvent } from 'react';

interface Setting {
    key: string;
    value: string | null;
    type: string;
    label: string | null;
}

interface Props {
    group: string;
    groups: Record<string, string>;
    settings: Record<string, Setting>;
    mediaBaseUrl: string;
}

export default function SettingsIndex({ group, groups, settings, mediaBaseUrl }: Props) {
    const initialData: Record<string, string> = {};
    Object.entries(settings).forEach(([key, setting]) => {
        initialData[key] = setting.value ?? '';
    });

    const { data, setData, post, processing, errors } = useForm(initialData);

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(`/admin/settings/${group}`);
    };

    return (
        <AdminLayout title={`Pengaturan: ${groups[group]}`}>
            <Head title={`Pengaturan: ${groups[group]}`} />

            {/* Group Tabs */}
            <nav className="flex gap-2 mb-8 flex-wrap">
                {Object.entries(groups).map(([g, label]) => (
                    <button
                        key={g}
                        onClick={() => router.get(`/admin/settings/${g}`)}
                        className={`px-4 py-2 rounded text-[13px] font-semibold tracking-wide transition-colors ${
                            g === group
                                ? 'bg-aru-merah text-aru-putih'
                                : 'bg-aru-biru-muda text-aru-biru-tua hover:bg-aru-biru-tua hover:text-aru-putih'
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </nav>

            <form onSubmit={submit} className="space-y-6 max-w-3xl">
                {Object.entries(settings).map(([key, setting]) => (
                    <div key={key}>
                        <label className="block text-[11px] font-normal uppercase tracking-wide text-aru-abu mb-2">
                            {setting.label ?? key}
                        </label>

                        {setting.type === 'image' ? (
                            <ImageUploader
                                currentUrl={data[key] ? `${mediaBaseUrl}/${data[key]}` : null}
                                onUploaded={(path) => setData(key, path)}
                            />
                        ) : setting.type === 'textarea' ? (
                            <textarea
                                value={data[key] || ''}
                                onChange={e => setData(key, e.target.value)}
                                rows={4}
                                className="w-full border border-surface-container-high rounded px-4 py-2 text-base focus:border-aru-merah outline-none bg-aru-putih resize-y"
                            />
                        ) : setting.type === 'json' ? (
                            <textarea
                                value={data[key] || ''}
                                onChange={e => setData(key, e.target.value)}
                                rows={4}
                                className="w-full border border-surface-container-high rounded px-4 py-2 text-sm font-mono focus:border-aru-merah outline-none bg-aru-putih resize-y"
                                placeholder='["Item 1", "Item 2"]'
                            />
                        ) : (
                            <input
                                type="text"
                                value={data[key] || ''}
                                onChange={e => setData(key, e.target.value)}
                                className="w-full border border-surface-container-high rounded px-4 py-2 text-base focus:border-aru-merah outline-none bg-aru-putih"
                            />
                        )}

                        {errors[key] && <p className="text-error text-[11px] mt-1">{errors[key]}</p>}
                    </div>
                ))}

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-aru-merah text-aru-putih px-8 py-3 rounded text-[13px] font-semibold tracking-[0.08em] uppercase hover:scale-[1.03] active:scale-95 transition-all disabled:opacity-50"
                >
                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
            </form>
        </AdminLayout>
    );
}
