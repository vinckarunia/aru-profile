import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

interface Props {
    stats: { clients: number; services: number; cities: number };
    unreadContacts: number;
}

export default function Dashboard({ stats, unreadContacts }: Props) {
    const cards = [
        { label: 'Pesan Belum Dibaca', value: unreadContacts, href: '/admin/contacts', icon: 'mail', color: 'text-red-600' },
        { label: 'Total Klien', value: stats.clients, href: '/admin/clients', icon: 'business', color: 'text-aru-merah' },
        { label: 'Total Layanan', value: stats.services, href: '/admin/services', icon: 'home_repair_service', color: 'text-aru-merah' },
        { label: 'Kota Jangkauan', value: stats.cities, href: '/admin/coverage', icon: 'location_on', color: 'text-aru-merah' },
    ];

    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cards.map((card) => (
                    <Link
                        key={card.label}
                        href={card.href}
                        className="bg-aru-putih border border-surface-container-high rounded-lg p-6 hover:shadow-md transition-shadow group"
                    >
                        <span className={`material-symbols-outlined ${card.color} text-3xl mb-2 block`}>
                            {card.icon}
                        </span>
                        <div className="font-heading font-semibold text-2xl text-aru-biru-tua">{card.value}</div>
                        <div className="text-sm text-aru-abu">{card.label}</div>
                    </Link>
                ))}
            </div>
        </AdminLayout>
    );
}
