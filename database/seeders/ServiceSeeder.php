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
                'description' => 'Kami menyediakan pemenuhan kebutuhan tenaga kerja yang dapat diandalkan dan profesional sesuai kebutuhan partner usaha.',
                'sort_order' => 1,
            ],
            [
                'icon' => 'person_search',
                'title' => 'Jasa Perekrutan & Penempatan',
                'description' => 'Kami menyediakan jasa perekrutan, penyeleksian dan penempatan tenaga kerja sesuai kebutuhan partner usaha sejak dari tahap awal hingga pelaporan kepada instansi terkait.',
                'sort_order' => 2,
            ],
            [
                'icon' => 'local_shipping',
                'title' => 'Layanan Logistik',
                'description' => 'Penyediaan solusi terbaik dalam menangani dinamika ketenagakerjaan dengan tindakan yang cepat dan tepat di lapangan.',
                'sort_order' => 3,
            ],
            [
                'icon' => 'verified',
                'title' => 'Keunggulan Bersaing',
                'description' => 'Harga kompetitif di pasar, fokus kepada kebutuhan partner usaha, pelibatan teknologi tepat guna, proses yang transparan, dan respon yang cepat dan tepat.',
                'sort_order' => 4,
            ],
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(['title' => $service['title']], $service);
        }
    }
}
