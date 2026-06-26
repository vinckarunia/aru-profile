<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $clients = [
            ['name' => 'PT. Samsung SDS Global SCL Indonesia', 'sort_order' => 1],
            ['name' => 'PT. Puninar Saranaraya (Group)', 'sort_order' => 2],
            ['name' => 'PT. CJ Logistics Indonesia', 'sort_order' => 3],
            ['name' => 'PT. CJ Foodville Bakery (Tous Les Jours)', 'sort_order' => 4],
            ['name' => 'PT. Sophie Paris / Brun Brun Indonesia', 'sort_order' => 5],
            ['name' => 'PT. Sora Bakery Group (TLJ-SORA)', 'sort_order' => 6],
            ['name' => 'PT. Tanto Intim Line', 'sort_order' => 7],
            ['name' => 'PT. CJ Food Lestari', 'sort_order' => 8],
            ['name' => 'PT. Prada Duta Indonesia', 'sort_order' => 9],
            ['name' => 'PT. Daesang Agung Indonesia (Miwon Group)', 'sort_order' => 10],
        ];

        foreach ($clients as $client) {
            Client::updateOrCreate(['name' => $client['name']], $client);
        }
    }
}
