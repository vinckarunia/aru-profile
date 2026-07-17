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
            ['key' => 'tagline', 'value' => 'Solusi Ketenagakerjaan Terpercaya untuk Bisnis Anda', 'type' => 'text', 'group' => 'identity', 'label' => 'Tagline (ID)'],
            ['key' => 'tagline_en', 'value' => 'Trusted Employment Solutions for Your Business', 'type' => 'text', 'group' => 'identity', 'label' => 'Tagline (EN)'],
            ['key' => 'about_short', 'value' => 'Solusi Ketenagakerjaan Terpercaya untuk Bisnis Anda. Berpengalaman melayani kebutuhan tenaga kerja nasional dan internasional.', 'type' => 'textarea', 'group' => 'identity', 'label' => 'Deskripsi Singkat Footer (ID)'],
            ['key' => 'about_short_en', 'value' => 'Trusted Employment Solutions for Your Business. Experienced in serving national and international labor needs.', 'type' => 'textarea', 'group' => 'identity', 'label' => 'Deskripsi Singkat Footer (EN)'],
            ['key' => 'founded_year', 'value' => '2002', 'type' => 'text', 'group' => 'identity', 'label' => 'Tahun Berdiri'],
            ['key' => 'careers_url', 'value' => 'https://careers.aru-pt.id', 'type' => 'text', 'group' => 'identity', 'label' => 'Link Portal Karir'],

            // Contact
            ['key' => 'address', 'value' => 'Ruko Duta Permai Blok E no.10, Jl.Raya Kali Malang, Jakasampurna, Bekasi 17145', 'type' => 'textarea', 'group' => 'contact', 'label' => 'Alamat Kantor Pusat'],
            ['key' => 'phone', 'value' => '(021) 88952278', 'type' => 'text', 'group' => 'contact', 'label' => 'Nomor Telepon'],
            ['key' => 'email', 'value' => 'admin@aru-pt.id', 'type' => 'text', 'group' => 'contact', 'label' => 'Email Kontak'],
            ['key' => 'whatsapp', 'value' => '622188952278', 'type' => 'text', 'group' => 'contact', 'label' => 'Nomor WhatsApp'],
            ['key' => 'maps_embed_url', 'value' => '', 'type' => 'text', 'group' => 'contact', 'label' => 'URL Embed Google Maps'],

            // SEO
            ['key' => 'meta_title', 'value' => 'PT. Alfa Reka Usaha — Solusi Ketenagakerjaan Terpercaya', 'type' => 'text', 'group' => 'seo', 'label' => 'Meta Title (ID)'],
            ['key' => 'meta_title_en', 'value' => 'PT. Alfa Reka Usaha — Trusted Employment Solutions', 'type' => 'text', 'group' => 'seo', 'label' => 'Meta Title (EN)'],
            ['key' => 'meta_description', 'value' => 'PT. Alfa Reka Usaha adalah perusahaan penyedia tenaga kerja dan layanan logistik berpengalaman sejak 2002. Melayani kebutuhan tenaga kerja nasional dan internasional.', 'type' => 'textarea', 'group' => 'seo', 'label' => 'Meta Description (ID)'],
            ['key' => 'meta_description_en', 'value' => 'PT. Alfa Reka Usaha is an experienced provider of workforce recruitment and logistics services since 2002. Serving national and international labor needs.', 'type' => 'textarea', 'group' => 'seo', 'label' => 'Meta Description (EN)'],
            ['key' => 'og_image', 'value' => null, 'type' => 'image', 'group' => 'seo', 'label' => 'Open Graph Image'],

            // Hero
            ['key' => 'hero_headline', 'value' => 'Solusi Ketenagakerjaan Terpercaya untuk Bisnis Anda', 'type' => 'textarea', 'group' => 'hero', 'label' => 'Judul Hero (ID)'],
            ['key' => 'hero_headline_en', 'value' => 'Trusted Employment Solutions for Your Business', 'type' => 'textarea', 'group' => 'hero', 'label' => 'Judul Hero (EN)'],
            ['key' => 'hero_subtext', 'value' => 'Berpengalaman melayani kebutuhan tenaga kerja nasional dan internasional dengan standar profesionalisme, akuntabilitas, dan progresivitas yang tinggi.', 'type' => 'textarea', 'group' => 'hero', 'label' => 'Sub Judul Hero (ID)'],
            ['key' => 'hero_subtext_en', 'value' => 'Experienced in serving national and international workforce needs with high standards of professionalism, accountability, and progressiveness.', 'type' => 'textarea', 'group' => 'hero', 'label' => 'Sub Judul Hero (EN)'],
            ['key' => 'hero_background', 'value' => null, 'type' => 'image', 'group' => 'hero', 'label' => 'Background Hero'],
            ['key' => 'cta_primary_label', 'value' => 'Pelajari Layanan', 'type' => 'text', 'group' => 'hero', 'label' => 'Label CTA Primer (ID)'],
            ['key' => 'cta_primary_label_en', 'value' => 'Explore Services', 'type' => 'text', 'group' => 'hero', 'label' => 'Label CTA Primer (EN)'],
            ['key' => 'cta_primary_url', 'value' => '#layanan', 'type' => 'text', 'group' => 'hero', 'label' => 'URL CTA Primer'],
            ['key' => 'cta_secondary_label', 'value' => 'Hubungi Konsultan', 'type' => 'text', 'group' => 'hero', 'label' => 'Label CTA Sekunder (ID)'],
            ['key' => 'cta_secondary_label_en', 'value' => 'Contact Consultant', 'type' => 'text', 'group' => 'hero', 'label' => 'Label CTA Sekunder (EN)'],
            ['key' => 'cta_secondary_url', 'value' => '#kontak', 'type' => 'text', 'group' => 'hero', 'label' => 'URL CTA Sekunder'],

            // About
            ['key' => 'about_headline', 'value' => 'Membangun Kepercayaan Sejak Awal', 'type' => 'text', 'group' => 'about', 'label' => 'Judul Tentang Kami (ID)'],
            ['key' => 'about_headline_en', 'value' => 'Building Trust from the Start', 'type' => 'text', 'group' => 'about', 'label' => 'Judul Tentang Kami (EN)'],
            ['key' => 'about_body_1', 'value' => 'PT. Alfa Reka Usaha hadir sebagai mitra strategis perusahaan dalam mengelola sumber daya manusia dan logistik. Kami percaya bahwa fondasi bisnis yang kuat dimulai dari tim yang tangguh dan operasional yang disiplin.', 'type' => 'textarea', 'group' => 'about', 'label' => 'Paragraf Pertama (ID)'],
            ['key' => 'about_body_1_en', 'value' => 'PT. Alfa Reka Usaha stands as a strategic partner in managing human resources and logistics. We believe that a strong business foundation starts with a resilient team and disciplined operations.', 'type' => 'textarea', 'group' => 'about', 'label' => 'Paragraf Pertama (EN)'],
            ['key' => 'about_body_2', 'value' => 'Dengan pendekatan yang akuntabel dan inovatif, kami terus beradaptasi dengan dinamika industri untuk memberikan solusi tenaga kerja yang tepat guna, efisien, dan berkelanjutan bagi setiap klien kami.', 'type' => 'textarea', 'group' => 'about', 'label' => 'Paragraf Kedua (ID)'],
            ['key' => 'about_body_2_en', 'value' => 'With an accountable and innovative approach, we continuously adapt to industry dynamics to deliver appropriate, efficient, and sustainable workforce solutions for our clients.', 'type' => 'textarea', 'group' => 'about', 'label' => 'Paragraf Kedua (EN)'],
            ['key' => 'vision', 'value' => 'Menyediakan tenaga kerja yang memenuhi kebutuhan perusahaan dalam keahlian, profesionalitas, tanggung jawab yang sesuai bagi pencapaian tujuan perusahaan.', 'type' => 'textarea', 'group' => 'about', 'label' => 'Visi (ID)'],
            ['key' => 'vision_en', 'value' => 'Providing labor that meets the company needs in expertise, professionalism, and appropriate responsibility for achieving corporate goals.', 'type' => 'textarea', 'group' => 'about', 'label' => 'Visi (EN)'],
            ['key' => 'mission', 'value' => json_encode([
                'Memberikan layanan operasional yang akuntabel dan efisien.',
                'Membangun sinergi yang kuat antara klien, karyawan, dan perusahaan.',
                'Terus berinovasi dalam manajemen sumber daya manusia.',
            ]), 'type' => 'json', 'group' => 'about', 'label' => 'Misi (ID)'],
            ['key' => 'mission_en', 'value' => json_encode([
                'Provide accountable and efficient operational services.',
                'Build a strong synergy between clients, employees, and the company.',
                'Continuously innovate in human resource management.',
            ]), 'type' => 'json', 'group' => 'about', 'label' => 'Misi (EN)'],

            // Strategic Expanded Sections (Values, Leadership, Competitive Advantages)
            ['key' => 'values', 'value' => json_encode([
                [
                    'title' => 'Tanggung Jawab',
                    'description' => 'Dengan berkolaborasi, kami mengambil bagian dalam kesuksesan operasional perusahaan Anda.'
                ],
                [
                    'title' => 'Sinergi',
                    'description' => 'Kami memadukan pengalaman dan kemampuan kami bersama team Anda dalam kerja sama dalam pengelolaan karyawan secara harmonis demi mencapai tujuan perusahaan Anda.'
                ],
                [
                    'title' => 'Membangun Kehidupan',
                    'description' => 'Kami memelihara kesepahaman berusaha sebagai bagian perjalanan membangun kehidupan manusia yang bekerja dalam kegembiraan di dunia ini.'
                ],
                [
                    'title' => 'Keterbukaan',
                    'description' => 'Kami selalu terbuka berdiskusi mendengarkan suara Anda demi memperkuat kerja sama memanfaatkan peluang berusaha bersama.'
                ],
                [
                    'title' => 'Kepercayaan',
                    'description' => 'Kesepakatan kita untuk mencapai sukses bersama dengan saling mengandalkan keunggulan satu sama lain untuk mewujudkan hasil terbaik dalam berusaha dengan aman dan nyaman dalam hubungan yang erat dan terpercaya.'
                ]
            ]), 'type' => 'json', 'group' => 'about', 'label' => 'Nilai-Nilai Perusahaan (ID)'],
            ['key' => 'values_en', 'value' => json_encode([
                [
                    'title' => 'Responsibility',
                    'description' => 'By collaborating, we take part in the success of your company\'s operations.'
                ],
                [
                    'title' => 'Synergy',
                    'description' => 'We combine our experience and capability with your team in a harmonious collaboration in employee management to achieve your company\'s goals.'
                ],
                [
                    'title' => 'Building Life',
                    'description' => 'We nurture mutual understanding in business as part of the journey to build the lives of human beings who work with joy in this world.'
                ],
                [
                    'title' => 'Openness',
                    'description' => 'We are always open to discuss and listen to your voice to strengthen collaboration and seize business opportunities together.'
                ],
                [
                    'title' => 'Trust',
                    'description' => 'Our agreement to achieve mutual success by relying on each other\'s strengths to realize the best results in conducting business safely and comfortably in a close and trusted relationship.'
                ]
            ]), 'type' => 'json', 'group' => 'about', 'label' => 'Nilai-Nilai Perusahaan (EN)'],
            ['key' => 'leader_name', 'value' => 'J. Hengky Wody', 'type' => 'text', 'group' => 'about', 'label' => 'Nama Pemimpin'],
            ['key' => 'leader_title', 'value' => 'Direktur Utama', 'type' => 'text', 'group' => 'about', 'label' => 'Jabatan Pemimpin (ID)'],
            ['key' => 'leader_title_en', 'value' => 'Managing Director', 'type' => 'text', 'group' => 'about', 'label' => 'Jabatan Pemimpin (EN)'],
            ['key' => 'leader_message', 'value' => "Salam perkenalan dari kami PT. Alfa Reka Usaha.\n\nMenjadi kebanggaan bagi kami bisa berkesempatan menjadi bagian dari proses pencapaian tujuan perusahaan Anda. Di era teknologi digital ini fungsi sumber daya manusia yang handal tetap menjadi faktor terpenting bagi suksesnya pencapaian tujuan perusahaan.\n\nDengan penuh semangat berkolaborasi bersama Anda dan team, kami siap berkontribusi menjadi bagian dari sukses perusahaan Anda melalui layanan pemenuhan kebutuhan karyawan yang paripurna.", 'type' => 'textarea', 'group' => 'about', 'label' => 'Pesan Sambutan Pemimpin (ID)'],
            ['key' => 'leader_message_en', 'value' => "Warm greetings from PT. Alfa Reka Usaha.\n\nIt is our pride to have the opportunity to be part of your process in achieving your company's goals. In this digital technology era, reliable human resource functions remain the most important factor for the successful achievement of corporate goals.\n\nWith high enthusiasm for collaborating with you and your team, we are ready to contribute to your company's success through perfect employee fulfillment services.", 'type' => 'textarea', 'group' => 'about', 'label' => 'Pesan Sambutan Pemimpin (EN)'],
            ['key' => 'leader_avatar', 'value' => null, 'type' => 'image', 'group' => 'about', 'label' => 'Foto Pemimpin'],
            ['key' => 'experience_text', 'value' => 'Perusahaan dan pemimpin kami sudah memiliki rentang pengalaman yang panjang dalam pengelolaan sumber daya manusia di berbagai penjuru di Indonesia. Kami melibatkan team yang bekerja secara profesional dalam penanganan sumber daya manusia yang menjadi asset terbaik perusahaan dalam berusaha. Berbagai perusahaan nasional dan internasional sudah menjadi bagian dari pelayanan terbaik kami dalam penyediaan dan pengelolaan sumber daya manusia.', 'type' => 'textarea', 'group' => 'about', 'label' => 'Teks Pengalaman Perusahaan (ID)'],
            ['key' => 'experience_text_en', 'value' => 'Our company and our leaders have a long track record of experience in managing human resources across various regions in Indonesia. We engage a team that works professionally in handling human resources, which is the company\'s best asset in doing business. Various national and international companies have been part of our best service in providing and managing human resources.', 'type' => 'textarea', 'group' => 'about', 'label' => 'Teks Pengalaman Perusahaan (EN)'],
            ['key' => 'competitive_advantages', 'value' => json_encode([
                'Harga kompetitif di pasar',
                'Fokus kepada kebutuhan partner usaha',
                'Pelibatan teknologi tepat guna',
                'Proses yang transparan',
                'Respon yang cepat dan tepat'
            ]), 'type' => 'json', 'group' => 'about', 'label' => 'Keunggulan Bersaing (ID)'],
            ['key' => 'competitive_advantages_en', 'value' => json_encode([
                'Competitive price in the market',
                'Focus on the needs of business partners',
                'Utilization of appropriate technology',
                'Transparent process',
                'Fast and appropriate response'
            ]), 'type' => 'json', 'group' => 'about', 'label' => 'Keunggulan Bersaing (EN)'],

            // Footer
            ['key' => 'footer_copyright', 'value' => '© 2024 PT. Alfa Reka Usaha. Seluruh Hak Cipta Dilindungi.', 'type' => 'text', 'group' => 'footer', 'label' => 'Teks Copyright (ID)'],
            ['key' => 'footer_copyright_en', 'value' => '© 2024 PT. Alfa Reka Usaha. All Rights Reserved.', 'type' => 'text', 'group' => 'footer', 'label' => 'Teks Copyright (EN)'],
            ['key' => 'privacy_url', 'value' => '#', 'type' => 'text', 'group' => 'footer', 'label' => 'URL Kebijakan Privasi'],
            ['key' => 'terms_url', 'value' => '#', 'type' => 'text', 'group' => 'footer', 'label' => 'URL Syarat & Ketentuan'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::updateOrCreate(
                ['key' => $setting['key']],
                $setting,
            );
        }
    }
}
