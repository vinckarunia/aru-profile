<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\CoverageCity;
use App\Models\GalleryItem;
use App\Models\LegalDocument;
use App\Models\Service;
use App\Models\SiteSetting;
use App\Models\Stat;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    public function index(): Response
    {
        $settings = SiteSetting::allCached();

        // Resolve image URLs
        $imageKeys = ['hero_background', 'og_image'];
        foreach ($imageKeys as $key) {
            if (!empty($settings[$key])) {
                $settings[$key] = url('/media/' . $settings[$key]);
            }
        }

        // Parse mission JSON
        if (!empty($settings['mission'])) {
            $settings['mission'] = json_decode($settings['mission'], true);
        }

        return Inertia::render('Home', [
            'settings' => $settings,
            'stats' => Stat::where('is_active', true)->orderBy('sort_order')->get(),
            'services' => Service::where('is_active', true)->orderBy('sort_order')->get(),
            'cities' => CoverageCity::where('is_active', true)->orderBy('province')->orderBy('city_name')->get(),
            'clientsActive' => Client::where('is_active', true)->where('type', 'active')->orderBy('sort_order')->get()->map(function ($c) {
                $c->logo_url = $c->logo ? url('/media/' . $c->logo) : null;
                return $c;
            }),
            'clientsPast' => Client::where('is_active', true)->where('type', 'past')->orderBy('sort_order')->get()->map(function ($c) {
                $c->logo_url = $c->logo ? url('/media/' . $c->logo) : null;
                return $c;
            }),
            'legal' => LegalDocument::where('is_active', true)->orderBy('sort_order')->get()->map(function ($d) {
                $d->image_url = $d->document_image ? url('/media/' . $d->document_image) : null;
                return $d;
            }),
            'gallery' => GalleryItem::where('is_active', true)->orderBy('sort_order')->get()->map(function ($g) {
                $g->image_url = $g->image ? url('/media/' . $g->image) : null;
                return $g;
            }),
        ]);
    }

    public function sitemap(): \Illuminate\Http\Response
    {
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . PHP_EOL;
        $xml .= '    <url>' . PHP_EOL;
        $xml .= '        <loc>' . url('/') . '</loc>' . PHP_EOL;
        $xml .= '        <lastmod>' . now()->format('Y-m-d') . '</lastmod>' . PHP_EOL;
        $xml .= '        <changefreq>daily</changefreq>' . PHP_EOL;
        $xml .= '        <priority>1.0</priority>' . PHP_EOL;
        $xml .= '    </url>' . PHP_EOL;
        $xml .= '</urlset>';

        return response($xml)
            ->header('Content-Type', 'text/xml');
    }
}
