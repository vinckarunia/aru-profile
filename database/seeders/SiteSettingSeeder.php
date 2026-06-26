<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // Identity
            ['key' => 'company_name', 'value' => 'PT. Alfa Reka Usaha', 'type' => 'text', 'group' => 'identity', 'label' => 'Nama Perusahaan'],
            ['key' => 'tagline', 'value' => 'Solusi Ketenagakerjaan Terpercaya untuk Bisnis Anda', 'type' => 'text', 'group' => 'identity', 'label' => 'Tagline'],
            ['key' => 'about_short', 'value' => 'Solusi Ketenagakerjaan Terpercaya untuk Bisnis Anda. Berpengalaman melayani kebutuhan tenaga kerja nasional dan internasional.', 'type' => 'textarea', 'group' => 'identity', 'label' => 'Deskripsi Singkat Footer'],
            ['key' => 'founded_year', 'value' => '2002', 'type' => 'text', 'group' => 'identity', 'label' => 'Tahun Berdiri'],

            // Contact
            ['key' => 'address', 'value' => 'Bekasi, Jawa Barat, Indonesia', 'type' => 'textarea', 'group' => 'contact', 'label' => 'Alamat Kantor Pusat'],
            ['key' => 'phone', 'value' => '021-80678000', 'type' => 'text', 'group' => 'contact', 'label' => 'Nomor Telepon'],
            ['key' => 'email', 'value' => 'admin@alfarekausahapt.com', 'type' => 'text', 'group' => 'contact', 'label' => 'Email Kontak'],
            ['key' => 'whatsapp', 'value' => '622180678000', 'type' => 'text', 'group' => 'contact', 'label' => 'Nomor WhatsApp'],
            ['key' => 'maps_embed_url', 'value' => '', 'type' => 'text', 'group' => 'contact', 'label' => 'URL Embed Google Maps'],

            // SEO
            ['key' => 'meta_title', 'value' => 'PT. Alfa Reka Usaha — Solusi Ketenagakerjaan Terpercaya', 'type' => 'text', 'group' => 'seo', 'label' => 'Meta Title'],
            ['key' => 'meta_description', 'value' => 'PT. Alfa Reka Usaha adalah perusahaan penyedia tenaga kerja dan layanan logistik berpengalaman sejak 2002. Melayani kebutuhan tenaga kerja nasional dan internasional.', 'type' => 'textarea', 'group' => 'seo', 'label' => 'Meta Description'],
            ['key' => 'og_image', 'value' => null, 'type' => 'image', 'group' => 'seo', 'label' => 'Open Graph Image'],

            // Hero
            ['key' => 'hero_headline', 'value' => 'Solusi Ketenagakerjaan Terpercaya untuk Bisnis Anda', 'type' => 'textarea', 'group' => 'hero', 'label' => 'Judul Hero'],
            ['key' => 'hero_subtext', 'value' => 'Berpengalaman melayani kebutuhan tenaga kerja nasional dan internasional dengan standar profesionalisme, akuntabilitas, dan progresivitas yang tinggi.', 'type' => 'textarea', 'group' => 'hero', 'label' => 'Sub Judul Hero'],
            ['key' => 'hero_background', 'value' => null, 'type' => 'image', 'group' => 'hero', 'label' => 'Background Hero'],
            ['key' => 'cta_primary_label', 'value' => 'Pelajari Layanan', 'type' => 'text', 'group' => 'hero', 'label' => 'Label CTA Primer'],
            ['key' => 'cta_primary_url', 'value' => '#layanan', 'type' => 'text', 'group' => 'hero', 'label' => 'URL CTA Primer'],
            ['key' => 'cta_secondary_label', 'value' => 'Hubungi Konsultan', 'type' => 'text', 'group' => 'hero', 'label' => 'Label CTA Sekunder'],
            ['key' => 'cta_secondary_url', 'value' => '#kontak', 'type' => 'text', 'group' => 'hero', 'label' => 'URL CTA Sekunder'],

            // About
            ['key' => 'about_headline', 'value' => 'Membangun Kepercayaan Sejak Awal', 'type' => 'text', 'group' => 'about', 'label' => 'Judul Tentang Kami'],
            ['key' => 'about_body_1', 'value' => 'PT. Alfa Reka Usaha hadir sebagai mitra strategis perusahaan dalam mengelola sumber daya manusia dan logistik. Kami percaya bahwa fondasi bisnis yang kuat dimulai dari tim yang tangguh dan operasional yang disiplin.', 'type' => 'textarea', 'group' => 'about', 'label' => 'Paragraf Pertama'],
            ['key' => 'about_body_2', 'value' => 'Dengan pendekatan yang akuntabel dan inovatif, kami terus beradaptasi dengan dinamika industri untuk memberikan solusi tenaga kerja yang tepat guna, efisien, dan berkelanjutan bagi setiap klien kami.', 'type' => 'textarea', 'group' => 'about', 'label' => 'Paragraf Kedua'],
            ['key' => 'vision', 'value' => 'Menjadi perusahaan penyedia tenaga kerja dan layanan logistik terdepan di tingkat nasional dan internasional dengan standar profesionalisme tertinggi.', 'type' => 'textarea', 'group' => 'about', 'label' => 'Visi'],
            ['key' => 'mission', 'value' => json_encode([
                'Memberikan layanan operasional yang akuntabel dan efisien.',
                'Membangun sinergi yang kuat antara klien, karyawan, dan perusahaan.',
                'Terus berinovasi dalam manajemen sumber daya manusia.',
            ]), 'type' => 'json', 'group' => 'about', 'label' => 'Misi'],

            // Footer
            ['key' => 'footer_copyright', 'value' => '© 2024 PT. Alfa Reka Usaha. Seluruh Hak Cipta Dilindungi.', 'type' => 'text', 'group' => 'footer', 'label' => 'Teks Copyright'],
            ['key' => 'privacy_url', 'value' => '#', 'type' => 'text', 'group' => 'footer', 'label' => 'URL Kebijakan Privasi'],
            ['key' => 'terms_url', 'value' => '#', 'type' => 'text', 'group' => 'footer', 'label' => 'URL Syarat & Ketentuan'],
            ['key' => 'sitemap_url', 'value' => '#', 'type' => 'text', 'group' => 'footer', 'label' => 'URL Peta Situs'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::updateOrCreate(
                ['key' => $setting['key']],
                $setting,
            );
        }
    }
}
