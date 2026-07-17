<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            SiteSettingSeeder::class,
            StatSeeder::class,
            ServiceSeeder::class,
            CoverageCitySeeder::class,
            ClientSeeder::class,
            LegalDocumentSeeder::class,
            GallerySeeder::class,
            TestimonialSeeder::class,
        ]);
    }
}
