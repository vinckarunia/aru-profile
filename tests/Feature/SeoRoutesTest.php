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
    public function test_robots_txt_returns_correct_content()
    {
        $response = $this->get('/robots.txt');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/plain; charset=UTF-8');
        
        $content = $response->getContent();
        $this->assertStringContainsString('User-agent: *', $content);
        $this->assertStringContainsString('Disallow: /admin', $content);
        $this->assertStringContainsString('Disallow: /admin/', $content);
        $this->assertStringContainsString('Sitemap: ' . url('/sitemap.xml'), $content);
    }

    /** @test */
    public function test_homepage_renders_server_side_seo_metadata()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        
        $content = $response->getContent();
        
        // Assert canonical
        $this->assertStringContainsString('<link rel="canonical" href="' . url('/') . '"', $content);
        
        // Assert Open Graph
        $this->assertStringContainsString('<meta property="og:title" content="', $content);
        $this->assertStringContainsString('<meta property="og:url" content="' . url('/') . '"', $content);
        $this->assertStringContainsString('<meta property="og:type" content="website"', $content);
        
        // Assert Twitter Card
        $this->assertStringContainsString('<meta name="twitter:card" content="summary_large_image"', $content);
        
        // Assert JSON-LD Organization
        $this->assertStringContainsString('"@type":"Organization"', $content);
        $this->assertStringContainsString('"url":"' . url('/') . '"', $content);
    }
}
