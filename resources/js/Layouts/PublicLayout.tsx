import { ReactNode } from 'react';
import Navbar from '@/Components/Public/Navbar';
import Footer from '@/Components/Public/Footer';
import { Settings } from '@/types';

interface Props {
    settings: Settings;
    children: ReactNode;
}

export default function PublicLayout({ settings, children }: Props) {
    return (
        <div className="min-h-screen bg-surface text-on-surface font-sans">
            <Navbar settings={settings} />
            <main className="pt-[72px]">
                {children}
            </main>
            <Footer settings={settings} />
        </div>
    );
}
