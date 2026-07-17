<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'icon' => 'groups',
                'title' => 'Jasa Penyediaan Tenaga Kerja',
                'title_en' => 'Manpower Supply Services',
                'description' => 'Kami menyediakan pemenuhan kebutuhan tenaga kerja yang dapat diandalkan dan profesional sesuai kebutuhan partner usaha.',
                'description_en' => 'We provide reliable and professional manpower solutions tailored to the needs of our business partners.',
                'sort_order' => 1,
            ],
            [
                'icon' => 'person_search',
                'title' => 'Jasa Perekrutan & Penempatan',
                'title_en' => 'Recruitment & Placement Services',
                'description' => 'Kami menyediakan jasa perekrutan, penyeleksian dan penempatan tenaga kerja sesuai kebutuhan partner usaha sejak dari tahap awal hingga pelaporan kepada instansi terkait.',
                'description_en' => 'We provide recruitment, selection, and placement services according to business partner needs from initial stages to reporting to relevant institutions.',
                'sort_order' => 2,
            ],
            [
                'icon' => 'local_shipping',
                'title' => 'Layanan Logistik',
                'title_en' => 'Logistics Services',
                'description' => 'Penyediaan solusi terbaik dalam menangani dinamika ketenagakerjaan dengan tindakan yang cepat dan tepat di lapangan.',
                'description_en' => 'Providing the best solutions in handling employment dynamics with fast and precise actions on the field.',
                'sort_order' => 3,
            ],
            [
                'icon' => 'verified',
                'title' => 'Keunggulan Bersaing',
                'title_en' => 'Competitive Advantages',
                'description' => 'Harga kompetitif di pasar, fokus kepada kebutuhan partner usaha, pelibatan teknologi tepat guna, proses yang transparan, dan respon yang cepat dan tepat.',
                'description_en' => 'Competitive pricing in the market, focusing on business partner needs, utilizing appropriate technology, transparent processes, and fast, accurate responses.',
                'sort_order' => 4,
            ],
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(['title' => $service['title']], $service);
        }
    }
}
