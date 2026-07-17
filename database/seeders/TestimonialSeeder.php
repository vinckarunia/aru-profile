<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            // Corporate testimonials
            [
                'name' => 'PT. Tanto Intim Line',
                'company_or_position' => 'Depo Peti Kemas & Logistik',
                'type' => 'corporate',
                'testimonial' => 'Kolaborasi operasional dengan PT. Alfa Reka Usaha sangat membantu kelancaran bisnis kami. Penyediaan tenaga kerja profesional, berintegritas tinggi, dan respons yang cepat di lapangan membuat kami sangat merekomendasikan layanan mereka.',
                'rating' => 5,
                'avatar' => null,
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'PT. Sora Bakery Group',
                'company_or_position' => 'F&B Retail (TLJ)',
                'type' => 'corporate',
                'testimonial' => 'Penyediaan kru operasional toko di wilayah Surabaya, Semarang, dan Bali selalu terpenuhi dengan kualifikasi yang tepat. Sistem pendampingan dan administrasi yang transparan memudahkan pengelolaan internal kami.',
                'rating' => 5,
                'avatar' => null,
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'PT. Prada Duta Indonesia',
                'company_or_position' => 'Manajemen Fasilitas & Distribusi',
                'type' => 'corporate',
                'testimonial' => 'Layanan pemenuhan kebutuhan staf logistik dari ARU sangat efisien dan akuntabel. Kerjasama yang terjalin erat membawa sinergi positif bagi pencapaian target operasional perusahaan kami.',
                'rating' => 5,
                'avatar' => null,
                'sort_order' => 3,
                'is_active' => true,
            ],
            
            // Worker testimonials
            [
                'name' => 'Ahmad Rian',
                'company_or_position' => 'Staf Logistik (Medan)',
                'type' => 'worker',
                'testimonial' => 'Proses seleksi dan penempatan kerja sangat transparan di PT ARU. Selama bekerja, hak-hak kami sebagai pekerja selalu dipenuhi dengan tepat waktu dan ada perhatian besar terhadap keselamatan kerja kami di lapangan.',
                'rating' => 5,
                'avatar' => null,
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Siti Aminah',
                'company_or_position' => 'Kru Outlet F&B (Semarang)',
                'type' => 'worker',
                'testimonial' => 'Saya merasa dihargai bekerja melalui PT. Alfa Reka Usaha. Pelatihan awal yang diberikan sangat membantu saya beradaptasi dengan standar pelayanan toko, dan koordinasi dengan pengawas ARU di cabang sangat harmonis.',
                'rating' => 5,
                'avatar' => null,
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Budi Santoso',
                'company_or_position' => 'Operator Forklift (Jakarta)',
                'type' => 'worker',
                'testimonial' => 'PT ARU bukan sekadar menyalurkan kerja, tapi benar-benar mendampingi kami. Hubungan komunikasi dengan tim admin terjalin terbuka, jika ada keluhan selalu ditanggapi dengan cepat dan dicarikan solusi bersama.',
                'rating' => 5,
                'avatar' => null,
                'sort_order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
