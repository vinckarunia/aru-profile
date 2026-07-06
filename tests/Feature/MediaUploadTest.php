<?php

namespace Tests\Feature;

use App\Models\Admin;
use App\Models\MediaFile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class MediaUploadTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\SiteSettingSeeder::class);
    }

    /** @test */
    public function test_it_saves_pdf_as_is()
    {
        Storage::fake('local');

        $admin = Admin::create([
            'name' => 'Admin Test',
            'email' => 'admin@test.com',
            'password' => bcrypt('password'),
        ]);

        $file = UploadedFile::fake()->create('document.pdf', 100, 'application/pdf');

        $response = $this->actingAs($admin, 'admin')->postJson(route('admin.media.upload'), [
            'file' => $file,
        ]);

        $response->assertStatus(200);
        $data = $response->json();

        // Check file exists in local storage
        $savedPath = 'media/' . $data['path'];
        Storage::disk('local')->assertExists($savedPath);
        $this->assertStringEndsWith('.pdf', $savedPath);

        // Check DB entry
        $this->assertDatabaseHas('media_files', [
            'id' => $data['id'],
            'path' => $savedPath,
        ]);
    }

    /** @test */
    public function test_it_converts_and_resizes_images_and_creates_thumbnail()
    {
        Storage::fake('local');

        $admin = Admin::create([
            'name' => 'Admin Test',
            'email' => 'admin@test.com',
            'password' => bcrypt('password'),
        ]);

        // Large image 2000x2000px
        $file = UploadedFile::fake()->image('photo.png', 2000, 2000);

        $response = $this->actingAs($admin, 'admin')->postJson(route('admin.media.upload'), [
            'file' => $file,
        ]);

        $response->assertStatus(200);
        $data = $response->json();

        // Check main WebP file exists
        $savedPath = 'media/' . $data['path'];
        Storage::disk('local')->assertExists($savedPath);
        $this->assertStringEndsWith('.webp', $savedPath);

        // Check thumbnail exists
        $thumbPath = str_replace('.webp', '-thumb.webp', $savedPath);
        Storage::disk('local')->assertExists($thumbPath);

        // Check DB entry mime_type is WebP
        $this->assertDatabaseHas('media_files', [
            'id' => $data['id'],
            'path' => $savedPath,
            'mime_type' => 'image/webp',
        ]);
        
        // Check delete works and removes both main image and thumbnail
        $media = MediaFile::find($data['id']);
        $deleteResponse = $this->actingAs($admin, 'admin')->deleteJson(route('admin.media.destroy', $media));
        
        $deleteResponse->assertStatus(200);
        Storage::disk('local')->assertMissing($savedPath);
        Storage::disk('local')->assertMissing($thumbPath);
        $this->assertDatabaseMissing('media_files', ['id' => $data['id']]);
    }
}
