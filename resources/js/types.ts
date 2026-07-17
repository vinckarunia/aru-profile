export interface Settings {
    [key: string]: string | string[] | null;
    company_name?: string;
    tagline?: string;
    logo?: string;
    favicon?: string;
    about_short?: string;
    founded_year?: string;
    address?: string;
    phone?: string;
    email?: string;
    whatsapp?: string;
    maps_embed_url?: string;
    meta_title?: string;
    meta_description?: string;
    og_image?: string;
    hero_headline?: string;
    hero_subtext?: string;
    hero_background?: string;
    cta_primary_label?: string;
    cta_primary_url?: string;
    cta_secondary_label?: string;
    cta_secondary_url?: string;
    about_headline?: string;
    about_body_1?: string;
    about_body_2?: string;
    vision?: string;
    mission?: string[];
    footer_copyright?: string;
    privacy_url?: string;
    terms_url?: string;
    sitemap_url?: string;
    careers_url?: string;
}

export interface StatItem {
    id: number;
    value: string;
    label: string;
    label_en: string | null;
    sort_order: number;
    is_active: boolean;
}

export interface ServiceItem {
    id: number;
    icon: string | null;
    title: string;
    title_en: string | null;
    description: string | null;
    description_en: string | null;
    sort_order: number;
    is_active: boolean;
}

export interface CityItem {
    id: number;
    city_name: string;
    province: string | null;
    sort_order: number;
    is_active: boolean;
}

export interface ClientItem {
    id: number;
    name: string;
    logo: string | null;
    logo_url: string | null;
    website_url: string | null;
    type: 'active' | 'past';
    sort_order: number;
    is_active: boolean;
}

export interface LegalDocItem {
    id: number;
    name: string;
    name_en: string | null;
    number: string | null;
    issuer: string | null;
    issuer_en: string | null;
    issued_date: string | null;
    expiry_date: string | null;
    document_image: string | null;
    image_url: string | null;
    sort_order: number;
    is_active: boolean;
}

export interface GalleryItem {
    id: number;
    title: string | null;
    title_en: string | null;
    description: string | null;
    description_en: string | null;
    image: string | null;
    image_url: string | null;
    thumb_url?: string | null;
    sort_order: number;
    is_active: boolean;
}

export interface ContactSubmission {
    id: number;
    name: string;
    company: string | null;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    is_read: boolean;
    ip_address: string | null;
    created_at: string;
    updated_at: string;
}

export interface PageProps {
    [key: string]: any;
    flash: {
        success?: string;
        error?: string;
    };
    mediaUrl: string;
    appName: string;
    auth?: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
}
