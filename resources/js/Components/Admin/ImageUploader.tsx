import { useState, useRef } from 'react';

interface Props {
    currentUrl: string | null;
    onUploaded: (path: string) => void;
}

export default function ImageUploader({ currentUrl, onUploaded }: Props) {
    const [preview, setPreview] = useState(currentUrl);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const res = await fetch('/admin/media/upload', {
                method: 'POST',
                headers: { 'X-CSRF-TOKEN': csrfToken || '' },
                body: formData,
            });

            if (!res.ok) throw new Error('Upload gagal');

            const json = await res.json();
            setPreview(json.url);
            onUploaded(json.path);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex items-start gap-4">
            {preview && (
                <img src={preview} alt="Preview" className="w-32 h-24 object-cover rounded border border-outline-variant" />
            )}
            <div>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading}
                    className="bg-aru-biru-muda text-aru-biru-tua px-4 py-2 rounded text-[13px] font-semibold hover:bg-aru-biru-tua hover:text-aru-putih transition-colors disabled:opacity-50"
                >
                    {uploading ? 'Mengunggah...' : preview ? 'Ganti Gambar' : 'Pilih Gambar'}
                </button>
                {error && <p className="text-error text-[11px] mt-1">{error}</p>}
            </div>
        </div>
    );
}
