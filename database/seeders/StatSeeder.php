<?php

namespace Database\Seeders;

use App\Models\Stat;
use Illuminate\Database\Seeder;

class StatSeeder extends Seeder
{
    public function run(): void
    {
        $stats = [
            ['value' => '20+', 'label' => 'Tahun Pengalaman', 'label_en' => 'Years of Experience', 'sort_order' => 1],
            ['value' => '1000+', 'label' => 'Karyawan Aktif', 'label_en' => 'Active Employees', 'sort_order' => 2],
            ['value' => '28', 'label' => 'Kota Jangkauan', 'label_en' => 'Cities Covered', 'sort_order' => 3],
        ];

        foreach ($stats as $stat) {
            Stat::updateOrCreate(['label' => $stat['label']], $stat);
        }
    }
}
