<?php

namespace Tests\Feature;

use App\Models\ContactSubmission;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SecurityProtectionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\SiteSettingSeeder::class);
    }

    /** @test */
    public function test_honeypot_prevents_db_insertion_but_returns_success()
    {
        $data = [
            'name' => 'Spam Bot',
            'email' => 'bot@spam.com',
            'message' => 'This is a spam message that should be caught by the honeypot.',
            'website_verification' => 'http://spammy-bot-link.com', // Filled honeypot
        ];

        $response = $this->post(route('contact.store'), $data);

        // Assert it does not save to database
        $this->assertDatabaseMissing('contact_submissions', [
            'email' => 'bot@spam.com',
        ]);

        // Assert redirect/success
        $response->assertStatus(302);
    }

    /** @test */
    public function test_legitimate_contact_saves_to_db()
    {
        $data = [
            'name' => 'Legit User',
            'email' => 'legit@user.com',
            'message' => 'This is a legitimate message longer than ten characters.',
            'website_verification' => '', // Empty honeypot
        ];

        $response = $this->post(route('contact.store'), $data);

        $response->assertStatus(302);

        $this->assertDatabaseHas('contact_submissions', [
            'email' => 'legit@user.com',
        ]);
    }

    /** @test */
    public function test_contact_form_has_rate_limiting()
    {
        $data = [
            'name' => 'Legit User',
            'email' => 'legit@user.com',
            'message' => 'This is a legitimate message longer than ten characters.',
            'website_verification' => '',
        ];

        // Send 3 requests (limit is 3 per minute)
        for ($i = 0; $i < 3; $i++) {
            $response = $this->post(route('contact.store'), $data);
            $response->assertStatus(302);
        }

        // 4th request should be throttled (429)
        $response = $this->post(route('contact.store'), $data);
        $response->assertStatus(429);
    }

    /** @test */
    public function test_admin_login_has_rate_limiting()
    {
        $loginData = [
            'email' => 'wrong@admin.com',
            'password' => 'wrongpassword',
        ];

        // Send 5 requests (limit is 5 per minute)
        for ($i = 0; $i < 5; $i++) {
            $response = $this->post(route('admin.login.post'), $loginData);
            // Credentials incorrect, but request is processed (redirects back with error)
            $response->assertStatus(302);
        }

        // 6th request should be throttled (429)
        $response = $this->post(route('admin.login.post'), $loginData);
        $response->assertStatus(429);
    }
}
