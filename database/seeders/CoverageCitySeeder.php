<?php

namespace Database\Seeders;

use App\Models\CoverageCity;
use Illuminate\Database\Seeder;

class CoverageCitySeeder extends Seeder
{
    public function run(): void
    {
        $cities = [
            // Jabodetabek
            ['city_name' => 'Jakarta', 'province' => 'Jabodetabek'],
            ['city_name' => 'Bekasi', 'province' => 'Jabodetabek'],
            ['city_name' => 'Cikarang', 'province' => 'Jabodetabek'],
            ['city_name' => 'Cibitung', 'province' => 'Jabodetabek'],
            ['city_name' => 'Tangerang', 'province' => 'Jabodetabek'],
            ['city_name' => 'Depok', 'province' => 'Jabodetabek'],
            ['city_name' => 'Bogor', 'province' => 'Jabodetabek'],
            ['city_name' => 'Cibinong', 'province' => 'Jabodetabek'],
            ['city_name' => 'Cibubur', 'province' => 'Jabodetabek'],

            // Jawa Barat
            ['city_name' => 'Karawang', 'province' => 'Jawa Barat'],
            ['city_name' => 'Purwakarta', 'province' => 'Jawa Barat'],
            ['city_name' => 'Cirebon', 'province' => 'Jawa Barat'],
            ['city_name' => 'Bandung', 'province' => 'Jawa Barat'],

            // Jawa Tengah & Jogja
            ['city_name' => 'Tegal', 'province' => 'Jawa Tengah & Jogja'],
            ['city_name' => 'Semarang', 'province' => 'Jawa Tengah & Jogja'],
            ['city_name' => 'Yogyakarta', 'province' => 'Jawa Tengah & Jogja'],
            ['city_name' => 'Solo', 'province' => 'Jawa Tengah & Jogja'],

            // Jawa Timur & Bali
            ['city_name' => 'Madiun', 'province' => 'Jawa Timur & Bali'],
            ['city_name' => 'Kediri', 'province' => 'Jawa Timur & Bali'],
            ['city_name' => 'Surabaya', 'province' => 'Jawa Timur & Bali'],
            ['city_name' => 'Mojokerto', 'province' => 'Jawa Timur & Bali'],
            ['city_name' => 'Gresik', 'province' => 'Jawa Timur & Bali'],
            ['city_name' => 'Denpasar', 'province' => 'Jawa Timur & Bali'],

            // Sumatera
            ['city_name' => 'Medan', 'province' => 'Sumatera'],
            ['city_name' => 'Batam', 'province' => 'Sumatera'],
            ['city_name' => 'Palembang', 'province' => 'Sumatera'],
            ['city_name' => 'Lampung', 'province' => 'Sumatera'],

            // Kalimantan
            ['city_name' => 'Balikpapan', 'province' => 'Kalimantan'],
            ['city_name' => 'Samarinda', 'province' => 'Kalimantan'],

            // Sulawesi
            ['city_name' => 'Manado', 'province' => 'Sulawesi'],
            ['city_name' => 'Makassar', 'province' => 'Sulawesi'],
        ];

        foreach ($cities as $i => $city) {
            CoverageCity::updateOrCreate(
                ['city_name' => $city['city_name'], 'province' => $city['province']],
                array_merge($city, ['sort_order' => $i + 1]),
            );
        }
    }
}
