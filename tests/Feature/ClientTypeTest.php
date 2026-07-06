<?php

namespace Tests\Feature;

use App\Models\Client;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClientTypeTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\SiteSettingSeeder::class);
    }

    /** @test */
    public function test_it_passes_active_and_past_clients_separately_to_homepage()
    {
        // Create active client
        Client::create([
            'name' => 'Active Corp',
            'type' => 'active',
            'is_active' => true,
        ]);

        // Create past client
        Client::create([
            'name' => 'Past Corp',
            'type' => 'past',
            'is_active' => true,
        ]);

        // Create inactive client
        Client::create([
            'name' => 'Inactive Corp',
            'type' => 'active',
            'is_active' => false,
        ]);

        $response = $this->get('/');

        $response->assertStatus(200);

        // Verify the structure of Inertia shared data
        $props = $response->original->getData()['page']['props'];

        $this->assertArrayHasKey('clientsActive', $props);
        $this->assertArrayHasKey('clientsPast', $props);

        $this->assertCount(1, $props['clientsActive']);
        $this->assertCount(1, $props['clientsPast']);

        $this->assertEquals('Active Corp', $props['clientsActive'][0]['name']);
        $this->assertEquals('Past Corp', $props['clientsPast'][0]['name']);
    }
}
