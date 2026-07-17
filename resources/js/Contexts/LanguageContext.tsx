import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from '../translations';

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (key: keyof typeof translations['id']) => string;
    getLocalized: <T = string>(key: string, data: Record<string, any>) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Language>('id');

    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang === 'id' || savedLang === 'en') {
            setLangState(savedLang);
        }
    }, []);

    const setLang = (newLang: Language) => {
        localStorage.setItem('language', newLang);
        setLangState(newLang);
    };

    const t = (key: keyof typeof translations['id']): string => {
        return translations[lang][key] || translations['id'][key] || String(key);
    };

    const getLocalized = <T = string>(key: string, data: Record<string, any>): T => {
        if (!data) return '' as any;
        if (lang === 'en') {
            const enKey = `${key}_en`;
            if (data[enKey] !== undefined && data[enKey] !== null && data[enKey] !== '') {
                return data[enKey] as T;
            }
        }
        return data[key] as T;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, getLocalized }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
