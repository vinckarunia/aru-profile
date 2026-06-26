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
                'description' => 'Fasilitas kantor administrasi dan koordinasi pusat.',
                'image' => null,
                'is_active' => true,
            ],
            [
                'title' => 'Armada Logistik dan Pengiriman',
                'description' => 'Kendaraan operasional siap melayani pengiriman domestik.',
                'image' => null,
                'is_active' => true,
            ],
            [
                'title' => 'Gudang Logistik Utama',
                'description' => 'Area penyimpanan terpadu dengan standar keamanan tinggi.',
                'image' => null,
                'is_active' => true,
            ],
            [
                'title' => 'Tim Operasional Lapangan',
                'description' => 'Pekerja profesional berkomitmen memberikan pelayanan terbaik.',
                'image' => null,
                'is_active' => true,
            ],
        ];

        foreach ($items as $item) {
            GalleryItem::create($item);
        }
    }
}
