import { LegalDocItem } from '@/types';
import { Stagger, StaggerItem } from '../Motion/Stagger';
import { useLanguage } from '@/Contexts/LanguageContext';

interface Props {
    documents: LegalDocItem[];
}

export default function LegalSection({ documents }: Props) {
    const { t, lang, getLocalized } = useLanguage();

    return (
        <section className="py-20 bg-aru-biru-muda" id="legalitas">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-block bg-aru-putih text-aru-merah px-3 py-1 rounded text-[13px] font-semibold tracking-[0.08em] uppercase mb-4 shadow-sm">
                        {t('nav_legal')}
                    </div>
                    <h2 className="font-heading font-bold text-[40px] leading-[1.3] text-aru-biru-tua">
                        {t('legal_title')}
                    </h2>
                    <p className="text-base text-aru-abu mt-2 max-w-2xl mx-auto leading-relaxed">
                        {t('legal_subtitle')}
                    </p>
                </div>

                <Stagger
                    staggerDelay={0.08}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {documents.map((doc) => {
                        const nameLocalized = getLocalized('name', doc);
                        const issuerLocalized = getLocalized('issuer', doc);

                        return (
                            <StaggerItem
                                key={doc.id}
                                y={16}
                                duration={0.4}
                                className="bg-aru-putih border-l-4 border-aru-emas rounded-lg p-6 hover:shadow-md transition-shadow cursor-default"
                            >
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-aru-emas text-2xl mt-0.5 filled" aria-hidden="true">
                                        verified
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-heading font-semibold text-lg text-aru-biru-tua mb-1">
                                            {nameLocalized}
                                        </h3>
                                        {doc.number && (
                                            <p className="text-sm text-aru-abu font-mono break-all">
                                                No. {doc.number}
                                            </p>
                                        )}
                                        {issuerLocalized && (
                                            <p className="text-sm text-aru-abu mt-1">
                                                {t('legal_issuer')}: {issuerLocalized}
                                            </p>
                                        )}
                                        {doc.issued_date && (
                                            <p className="text-[11px] text-aru-abu/60 mt-2">
                                                {t('legal_issued')}: {new Date(doc.issued_date).toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </StaggerItem>
                        );
                    })}
                </Stagger>
            </div>
        </section>
    );
}
