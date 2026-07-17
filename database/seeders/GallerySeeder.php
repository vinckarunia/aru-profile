<?php

namespace Database\Seeders;

use App\Models\GalleryItem;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'title' => 'Kantor Pusat PT Alfa Reka Usaha',
                'title_en' => 'PT Alfa Reka Usaha Head Office',
                'description' => 'Fasilitas kantor administrasi dan koordinasi pusat.',
                'description_en' => 'Central administrative and coordination office facility.',
                'image' => null,
                'is_active' => true,
            ],
            [
                'title' => 'Armada Logistik dan Pengiriman',
                'title_en' => 'Logistics and Delivery Fleet',
                'description' => 'Kendaraan operasional siap melayani pengiriman domestik.',
                'description_en' => 'Operational vehicles ready for domestic shipping.',
                'image' => null,
                'is_active' => true,
            ],
            [
                'title' => 'Gudang Logistik Utama',
                'title_en' => 'Main Logistics Warehouse',
                'description' => 'Area penyimpanan terpadu dengan standar keamanan tinggi.',
                'description_en' => 'Integrated storage area with high security standards.',
                'image' => null,
                'is_active' => true,
            ],
            [
                'title' => 'Tim Operasional Lapangan',
                'title_en' => 'Field Operational Team',
                'description' => 'Pekerja profesional berkomitmen memberikan pelayanan terbaik.',
                'description_en' => 'Professional workers committed to providing the best service.',
                'image' => null,
                'is_active' => true,
            ],
        ];

        foreach ($items as $item) {
            GalleryItem::updateOrCreate(['title' => $item['title']], $item);
        }
    }
}
