import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <>
            <Head title="Admin Login" />
            <div className="min-h-screen bg-aru-biru-tua flex items-center justify-center px-4 font-sans">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <img src="/images/logo/logo-white.png" alt="Logo" className="h-16 w-auto mx-auto mb-4" />
                        <h1 className="font-heading font-bold text-2xl text-aru-putih">Admin Panel</h1>
                        <p className="text-aru-putih/60 text-sm mt-1">PT. Alfa Reka Usaha</p>
                    </div>

                    <form onSubmit={submit} className="bg-aru-putih rounded-lg p-8 shadow-xl">
                        <div className="mb-6">
                            <label className="block text-[11px] font-normal uppercase tracking-wide text-aru-abu mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full border border-surface-container-high rounded px-4 py-3 text-base focus:border-aru-merah focus:ring-1 focus:ring-aru-merah outline-none transition-colors"
                                autoFocus
                            />
                            {errors.email && <p className="text-error text-[11px] mt-1">{errors.email}</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-[11px] font-normal uppercase tracking-wide text-aru-abu mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                className="w-full border border-surface-container-high rounded px-4 py-3 text-base focus:border-aru-merah focus:ring-1 focus:ring-aru-merah outline-none transition-colors"
                            />
                            {errors.password && <p className="text-error text-[11px] mt-1">{errors.password}</p>}
                        </div>

                        <div className="flex items-center mb-6">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={data.remember}
                                onChange={e => setData('remember', e.target.checked)}
                                className="mr-2 accent-aru-merah"
                            />
                            <label htmlFor="remember" className="text-sm text-aru-abu">Ingat saya</label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-aru-merah text-aru-putih py-3 rounded text-[13px] font-semibold tracking-[0.08em] uppercase hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                        >
                            {processing ? 'Masuk...' : 'Masuk'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
