<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $clients = [
            ['name' => 'PT. Samsung SDS Global SCL Indonesia', 'type' => 'active', 'sort_order' => 1],
            ['name' => 'PT. Puninar Saranaraya (Group)', 'type' => 'active', 'sort_order' => 2],
            ['name' => 'PT. CJ Logistics Indonesia', 'type' => 'active', 'sort_order' => 3],
            ['name' => 'PT. CJ Foodville Bakery (Tous Les Jours)', 'type' => 'active', 'sort_order' => 4],
            ['name' => 'PT. Sophie Paris / Brun Brun Indonesia', 'type' => 'active', 'sort_order' => 5],
            ['name' => 'PT. Sora Bakery Group (TLJ-SORA)', 'type' => 'active', 'sort_order' => 6],
            ['name' => 'PT. Tanto Intim Line', 'type' => 'past', 'sort_order' => 7],
            ['name' => 'PT. CJ Food Lestari', 'type' => 'past', 'sort_order' => 8],
            ['name' => 'PT. Prada Duta Indonesia', 'type' => 'past', 'sort_order' => 9],
            ['name' => 'PT. Daesang Agung Indonesia (Miwon Group)', 'type' => 'past', 'sort_order' => 10],
        ];

        foreach ($clients as $client) {
            Client::updateOrCreate(['name' => $client['name']], $client);
        }
    }
}
