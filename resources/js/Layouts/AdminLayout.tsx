import { ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Props {
    title: string;
    children: ReactNode;
}

const menuItems = [
    { label: 'Dashboard', href: '/admin', icon: 'dashboard' },
    { label: 'Pengaturan', href: '/admin/settings', icon: 'settings' },
    { label: 'Statistik', href: '/admin/stats', icon: 'bar_chart' },
    { label: 'Layanan', href: '/admin/services', icon: 'home_repair_service' },
    { label: 'Jangkauan', href: '/admin/coverage', icon: 'location_on' },
    { label: 'Klien', href: '/admin/clients', icon: 'business' },
    { label: 'Testimoni', href: '/admin/testimonials', icon: 'rate_review' },
    { label: 'Galeri', href: '/admin/gallery', icon: 'photo_library' },
    { label: 'Legalitas', href: '/admin/legal', icon: 'gavel' },
    { label: 'Pesan', href: '/admin/contacts', icon: 'mail' },
];

export default function AdminLayout({ title, children }: Props) {
    const { flash } = usePage<PageProps>().props;
    const currentUrl = usePage().url;

    return (
        <div className="min-h-screen bg-surface-container-low flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-aru-biru-tua text-aru-putih flex-shrink-0 flex flex-col min-h-screen fixed left-0 top-0 z-40">
                <div className="p-6 border-b border-aru-putih/10">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/images/logo/logo-original-white.png" alt="Logo" className="h-8 w-auto" />
                        <span className="font-heading font-bold text-sm tracking-wide">ADMIN PANEL</span>
                    </Link>
                </div>

                <nav className="flex-1 py-4 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = currentUrl === item.href || currentUrl.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                                    isActive
                                        ? 'bg-aru-merah/20 text-aru-putih border-r-3 border-aru-merah'
                                        : 'text-aru-putih/70 hover:text-aru-putih hover:bg-aru-putih/5'
                                }`}
                            >
                                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-aru-putih/10">
                    <Link
                        href="/admin/logout"
                        method="post"
                        as="button"
                        className="flex items-center gap-3 text-sm text-aru-putih/70 hover:text-aru-putih transition-colors w-full px-2 py-2"
                    >
                        <span className="material-symbols-outlined text-xl">logout</span>
                        Keluar
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 ml-64">
                <header className="bg-aru-putih border-b border-surface-container-high px-8 py-6">
                    <h1 className="font-heading font-bold text-2xl text-aru-biru-tua">{title}</h1>
                </header>

                <div className="p-8">
                    {flash?.success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded text-sm">
                            {flash.success}
                        </div>
                    )}
                    {flash?.error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded text-sm">
                            {flash.error}
                        </div>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
}
