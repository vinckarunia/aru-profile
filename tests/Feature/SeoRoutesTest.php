<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SeoRoutesTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Run database seeders if necessary, or manually create database records
        $this->seed(\Database\Seeders\SiteSettingSeeder::class);
    }

    /** @test */
    public function test_it_returns_sitemap_xml()
    {
        $response = $this->get('/sitemap.xml');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/xml; charset=UTF-8');
        
        $content = $response->getContent();
        $this->assertStringContainsString('<?xml version="1.0" encoding="UTF-8"?>', $content);
        $this->assertStringContainsString('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', $content);
        $this->assertStringContainsString('<loc>' . url('/') . '</loc>', $content);
    }

    /** @test */
    public function test_robots_txt_file_exists_and_contains_sitemap()
    {
        $robotsPath = public_path('robots.txt');
        
        $this->assertFileExists($robotsPath);
        
        $content = file_get_contents($robotsPath);
        $this->assertStringContainsString('User-agent: *', $content);
        $this->assertStringContainsString('Disallow: /admin', $content);
        $this->assertStringContainsString('Disallow: /admin/', $content);
        $this->assertStringContainsString('Sitemap: https://alfarekausahapt.com/sitemap.xml', $content);
    }
}
